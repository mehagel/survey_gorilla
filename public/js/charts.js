$(function(){

  $.get(location.pathname+'/get', {js_origin: true})
    .done(function(survey){
      var mySurvey = new Survey();
      mySurvey.parseSurvey(survey);
      mySurvey.updateCurrentQuestion();
      mySurvey.updateChart();

      bindEvents(mySurvey);
    });

});

function bindEvents(survey){
  $('#next').click(function(){
    if (!$(this).hasClass('disabled')){
      handleNext(survey);
    }
  });
  $('#prev').click(function(){
    if (!$(this).hasClass('disabled')){
      handlePrev(survey);
    }
  });
}

function handleNext(survey){
  survey.question_index += 1;
  survey.updateCurrentQuestion();
  survey.updateChart();
  if (survey.question_index > 0){
    $('#prev').removeClass('disabled');
  }
  if (survey.question_index >= (survey.questions.length - 1)) {
    $('#next').addClass('disabled');
  }
}

function handlePrev(survey){
  survey.question_index -= 1;
  survey.updateCurrentQuestion();
  survey.updateChart();
  if (survey.question_index == 0){
    $('#prev').addClass('disabled');
  }
  if (survey.question_index < (survey.questions.length - 1)) {
    $('#next').removeClass('disabled');
  }
}

// Survey object
var Survey = function(){
  this.questions = [];
  this.question_index = 0;
  this.currentQuestion = null;
  this.chart = new Chart();
}

Survey.prototype = {
  parseSurvey: function(survey){
    results = survey.results;
    for (question in results){
      myQuestion = new Question(question);
      myQuestion.getChoices(results[question]);
      this.questions.push(myQuestion);
    }
  },
  updateCurrentQuestion: function(first){
    this.currentQuestion = this.questions[this.question_index];
    var question_tag = $('#question')
    question_tag.hide();
    question_tag.text(this.currentQuestion.content);
    question_tag.fadeIn(750);
  },
  updateChart: function(){
    this.chart.resetChart();
    vote_data = [];
    choice_data = [];
    this.currentQuestion.choices.forEach(function(choice, index, choices){
      vote_data.push(choice.votes);
      choice_data.push(choice.content);
    });
    this.chart.renderChart(vote_data, choice_data);
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

// Chart object
var Chart = function(){
  this.chart = d3.select(".results-display").append("svg")
      .attr("class", "chart")
      .attr("width", 440)
      .attr("height", 140)
    .append("g")
      .attr("transform", "translate(10,15)");
}

// http://mbostock.github.io/d3/tutorial/bar-1.html

Chart.prototype = {
  resetChart: function(){
    // bars
    this.chart.selectAll("rect")
        .remove();

    // vote value
    this.chart.selectAll(".vote-val")
        .remove();

    // choice content
    this.chart.selectAll(".choice-content")
        .remove();

    this.chart.selectAll("line")
        .remove();
  },

  renderChart: function(vote_data, choice_data){

    var x = d3.scale.linear()
        .domain([0, d3.max(vote_data)])
        .range([0, 420]);    

    // UPDATE AND ENTER

    // bars
    this.chart.selectAll("rect")
        .data(vote_data)
      .enter().append("rect")
        .attr("x",100)
        .attr("y", function(d, i) { return i * 20 })
        .attr("width", 0)
        .attr("height", 20);

    // vote value
    this.chart.selectAll(".vote-val")
        .data(vote_data)
      .enter().append("text")
        .attr("class", "vote-val")
        .attr("x", 100)
        .attr("y", function(d, i) { return (i * 20)+10 })
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .style("fill-opacity", 1e-6)
        .text(String);

    // choice content
    this.chart.selectAll(".choice-content")
        .data(choice_data)
      .enter().append("text")
        .attr("class", "choice-content")
        .attr("x", 80)
        .attr("y", function(d, i) { return (i * 20)+10 })
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .style("fill-opacity", 1e-6)
        .text(String);

    // transition in bars
    this.chart.selectAll("rect")
      .transition()
        .duration(750)
        .attr("width", x);

    // transition in vote values
    this.chart.selectAll(".vote-val")
      .transition()
        .duration(750)
        .style("fill-opacity", 1);

    // transition in choice content
    this.chart.selectAll(".choice-content")
      .transition()
        .duration(750)
        .style("fill-opacity", 1);

    // line
    this.chart.selectAll("line")
        .data([1])
      .enter().append("line")
        .style("z-index",1)
        .attr("x1",100)
        .attr("x2",100)
        .attr("y1", 0)
        .attr("y2", vote_data.length * 20)
        .style("stroke", "#000");
  }

}