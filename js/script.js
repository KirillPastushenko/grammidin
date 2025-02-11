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

$(function() {
   const $taste = $('#taste');
   let isTriggered = false; // Флаг для однократного срабатывания
 
   function checkConditions() {
     const scrollTop = $(window).scrollTop();
     const windowHeight = $(window).height();
     const tasteOffset = $taste.offset().top;
     const tasteHeight = $taste.outerHeight();
 
     // Проверка двух условий:
     // 1. Элемент виден в viewport (верхняя граница в зоне видимости)
     // 2. Скролл находится ниже элемента (нижняя граница элемента выше скролла)
     return (
       scrollTop + windowHeight >= tasteOffset || // Условие видимости
       scrollTop >= tasteOffset // Скролл ниже элемента
     );
   }
 
   function handleScroll() {
     if (!isTriggered && checkConditions()) {
       animateTasteItems(); // Вызов целевой функции
       isTriggered = true; // Запрещаем повторное срабатывание
       
       // Если нужно повторное выполнение - удалите эти две строки
       $(window).off('scroll resize', handleScroll);
     }
   }
 
   // Инициализация обработчиков
   if ($taste.length) {
     $(window)
       .on('scroll resize', handleScroll)
       .trigger('scroll'); // Проверка при загрузке
   }
 });

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
         $('#paint').removeClass('with-brush').attr('data-brush', '');
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
   
	function easeOutQuad(t) {
		return t * (2 - t);
	}
	function customEasing(t) {
		if (t < 0.5) {
			// От 0 до 0.5 – линейное движение.
			return t;
		} else {
			const u = (t - 0.5) / 0.5; // u изменяется от 0 до 1
			return 0.5 + 0.5 * easeOutQuad(u);
		}
	}

   const animate = () => {
       const elapsed = Date.now() - startTime;
       const progress = Math.min(elapsed / 4000, 1);
		const easedProgress = customEasing(progress);
       
       // Анимация обводки path1
       path1.style.strokeDashoffset = path1Length * (1 - easedProgress);
       
       // Анимация движения пчелы
       const currentLength = easedProgress * path2Length;
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
 
       if (progress < 0.99) {
           requestAnimationFrame(animate);
       }
   };
   
   requestAnimationFrame(animate);
});