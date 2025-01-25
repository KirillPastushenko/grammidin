$(document).ready(function(){
   $('.btn-paint').on('click', function(){
      $('.paint-wrapper, .paint-poster1, .paint-poster2').toggleClass('active')
   })

   $('.paint-palitra-item').on('click', function(){
      $('#buttons .button').removeClass('clickable');
      const id = $(this).attr('data-id')
      $(this).addClass('active');

      $(`.button.${id}`).addClass('clickable');

   })

   $('#buttons .button').on('click', function(){
      $(this).addClass('active');
      $(this).removeClass('clickable');
   })
})