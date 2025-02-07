const PDF_LINK = 'pdf/Раскраска.pdf';

function animateTasteItems() {
   let currentIndex = -1;
   const items = $('.taste-animation-item');
   const itemCount = items.length;

   function switchActiveItem() {
       if (currentIndex >= 0) {
           items.eq(currentIndex).removeClass('active');
       }

       currentIndex = (currentIndex + 1) % itemCount;

       items.eq(currentIndex).addClass('active');
   }

   switchActiveItem();
   setInterval(switchActiveItem, 4000);
}



$(document).ready(function(){
 
   AOS.init({
      once: true, 
   });

      
   
   document.addEventListener('aos:in', ({ detail }) => {
      if (detail.id === 'taste') animateTasteItems();;
  });


   $('h1 span').addClass('reveal-text');
   $('.top-pic').addClass('fromLeft');

   $('.btn-paint').on('click', function(e){
      const isActive = $(this).hasClass('active');
      const isPdf = $(this).hasClass('btn-orange'); 
      const btnText = isActive ? 'Хочу творить!' : 'Завершить';

      if (isPdf) return;

      e.preventDefault();
      
      $('.btn-paint span').text(btnText);

      $('.paint-wrapper, .paint-poster1, .paint-poster2, .btn-paint').toggleClass('active');
   })

   $('.paint-wrapper, paint-poster2').on('click', function(){
      if(!$(this).hasClass('active')){
            $('.paint-wrapper, .paint-poster1, .paint-poster2, .btn-paint').addClass('active');
            $('.btn-paint span').text('Завершить');
      }
   })

   $('.paint-palitra-item').on('click', function(){
      $('.paint-palitra-item').removeClass('active');
      
      if(!$(this).hasClass('disable')) {
         const id = $(this).attr('data-id');
         $('#buttons .button').removeClass('clickable');
         $(`.button.${id}`).addClass('clickable');
         $('#paint').attr('data-brush',id);

         $(this).addClass('active');
      }
   })

   $('#buttons .button').on('click', function(){
      if(!$(this).hasClass('disable')) {
         const id = $(this).attr('data-id')

         $(this).addClass('active').addClass('disable');
         $(this).removeClass('clickable');
         $('#paint').removeClass('with-brush');
         $(`.paint-palitra-item[data-id="${id}"]`)
            .removeClass('active')
            .addClass('disable');

         if($('.paint-palitra-item.disable').length === 6) {
            $('.btn-paint').addClass('btn-orange')
            $('.btn-paint a').attr({'href':PDF_LINK, '_target': 'blank'})
                 
            $('.btn-paint span').text('Хочу скачать!');
            $('.btn-paint img').attr('src', 'img/btn-pdf.png');
         }
      }
   })
})




// Анимация пчелы

document.addEventListener('DOMContentLoaded', () => {
   const path1 = document.getElementById('path1');
   const path2 = document.getElementById('path2');
   const bee = document.getElementById('bee');
   
   // Рассчитываем длины путей
   const path1Length = path1.getTotalLength();
   const path2Length = path2.getTotalLength();
   
   // Настройка анимации для path1
   path1.style.strokeDasharray = path1Length;
   path1.style.strokeDashoffset = path1Length;
   
   // Начальная позиция пчелы
   const startPoint = path2.getPointAtLength(0);
   bee.setAttribute('x', startPoint.x - 25);
   bee.setAttribute('y', startPoint.y - 25);
   
   let startTime = Date.now();
   
   const animate = () => {
       const elapsed = Date.now() - startTime;
       const progress = Math.min(elapsed / 2000, 1);
       
       // Анимация обводки path1
       path1.style.strokeDashoffset = path1Length * (1 - progress);
       
       // Анимация движения пчелы
       const currentLength = progress * path2Length;
       const point = path2.getPointAtLength(currentLength);
       
       // Рассчет угла поворота
       const nextPoint = path2.getPointAtLength(
           Math.min(currentLength + 1, path2Length)
       );
       const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
       
       // Обновление позиции и поворота пчелы
       bee.setAttribute('x', point.x - 25);
       bee.setAttribute('y', point.y - 25);
       bee.setAttribute('transform', `rotate(${angle} ${point.x} ${point.y})`);
       
       if (progress < 1) {
           requestAnimationFrame(animate);
       }
   };
   
   requestAnimationFrame(animate);
});