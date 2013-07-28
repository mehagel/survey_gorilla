$(function(){

  mySurvey = new Survey();

  $.get(location.pathname+'/get', {js_origin: true})
    .done(function(survey){
      mySurvey.parseSurvey(survey);

      console.log(mySurvey);

      var i = 0;
      var question = updateQuestion(mySurvey, i, true);
      var chart = initializeChart();

      updateChart(chart, question);

      // bindEvents();
    });

});

function bindEvents(){
  $('')
}

// Survey object
var Survey = function(){
  this.questions = [];
}

Survey.prototype = {
  parseSurvey: function(survey){
    results = survey.results;
    for (question in results){
      myQuestion = new Question(question);
      myQuestion.getChoices(results[question]);
      this.questions.push(myQuestion);
    }
  }
}

// Question object
var Question = function(content){
  this.content = content;
  this.choices = [];
}

Question.prototype = {
  getChoices: function(question){
    for (choice in question){
      myChoice = new Choice(choice, question[choice]);
      this.choices.push(myChoice);
    }
  }
}

// Choice object
var Choice = function(content, votes){
  this.content = content;
  this.votes = votes;
}

function updateQuestion(survey, question_index, first){
  var question = survey.questions[question_index];
  var question_tag = $('#question')
  if (!first){
    question_tag.fadeOut(400);
  }
  question_tag.text(question.content);
  question_tag.fadeIn(400);
  return question;
}

// function updateData(question){
//   var data = []
//   question.choices.forEach(function(choice, index, choices){
//     data.push(choice.votes)
//   })
//   return data;
// }

// http://mbostock.github.io/d3/tutorial/bar-1.html

function initializeChart(){

  var chart = d3.select(".results-display").append("svg")
      .attr("class", "chart")
      .attr("width", 440)
      .attr("height", 140)
    .append("g")
      .attr("transform", "translate(10,15)");

  return chart;
}

function updateChart(chart, question){

  vote_data = [];
  choice_data = [];
  question.choices.forEach(function(choice, index, choices){
    vote_data.push(choice.votes);
    choice_data.push(choice.content);
  })


  var x = d3.scale.linear()
      .domain([0, d3.max(vote_data)])
      .range([0, 420]);

  // enter()

  // bars
  chart.selectAll("rect")
      .data(vote_data)
    .enter().append("rect")
      .attr("x",100)
      .attr("y", function(d, i) { return i * 20 })
      .attr("width", 0)
      .attr("height", 20)
    .transition()
      .duration(750)
      .attr("width", x);

  // vote value
  chart.selectAll("text .vote-val")
      .data(vote_data)
    .enter().append("text")
      .attr("class", "vote-val")
      .attr("x", 100)
      .attr("y", function(d, i) { return (i * 20)+10 })
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(String);

  // choice content
  chart.selectAll("text .choicecontent")
      .data(choice_data)
    .enter().append("text")
      .attr("class", "choice-content")
      .attr("x", 80)
      .attr("y", function(d, i) { return (i * 20)+10 })
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(String);

  // line
  chart.append("line")
      .attr("x1",100)
      .attr("x2",100)
      .attr("y1", 0)
      .attr("y2", vote_data.length * 20)
      .style("stroke", "#000");


}