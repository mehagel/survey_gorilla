$(document).ready(function() {

  $('#login').click(function(e){
    e.preventDefault();
    $('#login').fadeOut(500);
    menu_show();
    display_bunny_facts(new bunny);
  });
  $('#create_user').on('click', function(e){
    if($(e.target).is('input')){
      e.preventDefault();
    }else{
      if ($(e.target).is('button_create')){
        
      }
     menu_hide();
    };
  });
});


function display_bunny_facts(bunny) {
  setInterval(function() {
    $('#form_text').text("bunnies are..." + shuffle(bunny.facts)[0]);
    $('#form_text').fadeIn(1000).delay(3000).fadeOut(1000);
   }, 5000);
}

function shuffle(array) {
  for (var tmp, cur, top=array.length; top--;){
    cur = (Math.random() * (top + 1)) << 0;
    tmp = array[cur]; array[cur] = array[top]; array[top] = tmp;
  }
  return array;
}

var bunny = function(){
  this.facts = ['cute', 'fuzzy', 'fast', 'deadly', 'jumpy', 'soft', 'minty', 'delicious', 'quiet', 'small', 'speedy', 'many', 'fluffy', 'cuddly']
}

function menu_show(){
  $('#create_user').animate({
    left: '+=700'
  }, 800);
  $('#form_user').find('input').first().focus();
  $('#form_text').hide();
}

function menu_hide(){
  $('#create_user').animate({
    left: '-=700'
  }, 800);
  $('#login').fadeIn(500);
}
