$(document).ready(function() {
  var questionTemplate = $.trim($('#question_template').html());

  function bindEvents() {
    $('#create_survey').on('click', '#add_question', addQuestion);
    $('#create_survey').on('click', '#add_choice', function() {
     console.log('hi')
     $('.choices').closest('.survey_questions').append("<input class='choice' type='text' name='choice[content]' placeholder='choice 2'>");

   });
  }

  function addQuestion() {
    var $question = $(questionTemplate);
    $question.appendTo('.survey_questions');
  }

  $('#survey_form').on('submit', function(e) {
    e.preventDefault();
    var form_data = $(this).serializeArray();
    var survey = {};
    var question = {};
    var question_bank = [];

    while (form_data.length > 0){
      if (form_data[0].name == 'survey[name]'){
        survey.name = form_data[0].value;
        form_data.shift();
      }  
      if (form_data[0].name == 'question[content]'){
        var choices = [];
        var question = {};
        question.content = form_data[0].value;
        form_data.shift();
        while (form_data.length > 0 && form_data[0].name == 'choice[content]'){
          choices.push(form_data[0].value);
          form_data.shift();
        }
        question.choice = choices;
        question_bank.push(question = question);
      }   
      survey.questions = question_bank;
    } 
    if (form_data.length == 0){
      $.post('/create_survey', survey).done(function(response){
        console.log('hello')
        location.reload();
        });
      
    }  
  });



  bindEvents();
});
