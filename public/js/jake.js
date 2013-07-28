$(document).ready(function() {

  $('#login').click(function(e){
    e.preventDefault();
    $('#login').fadeOut(500);
    $('#create_user').animate({
      left: '+=700'
    }, 800);
    $('#form_user').find('input').first().focus();
    $('#create_user').on('click', function(e){
      console.log(e.target)
      if($(e.target).is('input')){
        e.preventDefault();
        return;
      }else{
      $('#create_user').animate({
        left: '-=700'
      }, 800);
      $('#login').fadeIn(500);
    };
    });
  });



});
