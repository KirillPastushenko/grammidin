function animateTasteItems() {
   let currentIndex = -1;
   const items = $('.taste-animation-item');
   const itemCount = items.length;

   function switchActiveItem() {
      console.log('switchActiveItem');
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
   AOS.init();
   animateTasteItems();
   $('h1 span').addClass('reveal-text');
   $('.top-pic').addClass('fromLeft');

   $('.btn-paint').on('click', function(){
      $('.paint-wrapper, .paint-poster1, .paint-poster2').toggleClass('active')
   })

   $('.paint-palitra-item').on('click', function(){
      $('#buttons .button').removeClass('clickable');
      $('.paint-palitra-item').removeClass('active');
      const id = $(this).attr('data-id')
      $(this).addClass('active');

      $(`.button.${id}`).addClass('clickable');

   })

   $('#buttons .button').on('click', function(){
      $(this).addClass('active');
      $(this).removeClass('clickable');
   })
})