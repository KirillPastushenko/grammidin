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
   animateTasteItems();
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

   $('.paint-palitra-item').on('click', function(){
      if(!$(this).hasClass('disable')) {
         const id = $(this).attr('data-id');
         $('#buttons .button').removeClass('clickable');
         $(`.button.${id}`).addClass('clickable');
         $('#paint').addClass('with-brush');

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
            $('.btn-paint')
               .attr({'href':PDF_LINK, '_target': 'blank'})
               .addClass('btn-orange')
               .removeClass('active');
            
            $('.btn-paint span').text('Хочу скачать!');
            $('.btn-paint img').attr('src', 'img/btn-pdf.png');
         }
      }
   })
})