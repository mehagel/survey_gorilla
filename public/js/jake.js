$(document).ready(function() {

  $('#login').click(function(e){
    e.preventDefault();
    $('#login').fadeOut(500);
    menu_show();
    bunny_fact((new bunny).facts[0])
    display_bunny_facts(new bunny)
  });
  $('#create_user').on('click', function(e){
    if($(e.target).is('input')){
      e.preventDefault();
    }else{
      if ($(e.target).is('button')){
        e.preventDefault();
        var form_data = $('#form_user').serializeArray();
        var form = {};
        form.username = form_data[0].value;
        form.password = form_data[1].value;
        if (form.username == "" || form.password == ""){
          if (form.username == "") {
            $('#form_user input').first().effect('highlight', {color: '#DD1818'}, 1000)
          }
          if (form.password == "") {
            $('#form_user input').last().effect('highlight', {color: '#DD1818'}, 1000)
          }
        }else{
          $.post('/login_user').done(function(response){
            console.log(response)
            menu_hide(no_log = false);
            clearInterval(intervalId);
            location.reload();
          });
        }
      }else{
         menu_hide(no_log = true);
         // $('#login').fadeOut(500);
         clearInterval(intervalId); 
       }
    };
  });

});

function display_bunny_facts(bunny) {
  intervalId = setInterval(function() { 
    bunny_fact(shuffle(bunny.facts)[0])
  }, 5000);
}

function bunny_fact(fact){
  $('#form_text').text("bunnies are..." + fact);
  $('#form_text').fadeIn(1000).delay(3000).fadeOut(1000);
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

function menu_hide(no_log){
  $('#create_user').animate({
    left: '-=700'
  }, 800);
  if (no_log == true){
    $('#login').fadeIn(500);
  }
}
