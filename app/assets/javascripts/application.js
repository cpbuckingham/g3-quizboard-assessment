//= require jquery
//= require jquery_ujs
//= require_tree .


var questionCount = 1;
var answers = [];

var getNextQuestion = function(){
  if (questionCount > 4) {
    proceedToScoring();
  } else {
    var url = '/questions/' + questionCount;
    appendQuestionNumber();

    $.ajax({
      url: url,
      method: 'GET',
      success: function (data) {
        appendQuestion(data);
        appendNextButton();
        questionCount++;
        attachClickEvents();
      }
    })
  }
};

var appendQuestion = function(data){
  var answerDiv = $('.answers');
  $('.question').append(data.description);

  for (var i = 0; i < 4; i++) {
    answerDiv.append(button(data.possible_answers[i]))
  }
};

var button = function(answer){
  return '<button id="' + answer.correct + '" class="btn btn-default answer-button">' + answer.description + '</button>'
};

var attachClickEvents = function(){
  $('.answer-button').click(function() {
      colorButtons(this);
      $('.answer-button').attr('disabled', true);
    }
  )
};

var colorButtons = function(clickedButton){
  if ($(clickedButton).attr('id') === 'false') {
    $(clickedButton).removeClass('btn-default')
      .addClass('btn-danger');
    $('.result').append('Incorrect!');
    answers.push(0)
  } else {
    $('.result').append('Correct!');
    answers.push(1)
  }
  $('#true').removeClass('btn-default')
    .addClass('btn-success');
  attachNextClick();
};

var appendNextButton = function(){
  var button = '<button class="btn btn-primary next-button">Next</button>';
  $('.nav').append(button)
};

var attachNextClick = function() {
  $('.next-button').click(function(){
    wipePage();
    getNextQuestion();
  })
};

var appendQuestionNumber = function(){
  number = questionCount + '/4';

  $('.score').append(number)
};

var wipePage = function() {
  $('.question').empty();
  $('.result').empty();
  $('.nav').empty();
  $('.score').empty();
  $('.answers').empty();
};

var proceedToScoring = function() {
  var link = '<a href="/">Back to start</a>';
  var score = answers.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
  }) / 4 * 100;

  $('.question').append('Quiz complete!');
  $('.result').append('You scored ' + score + '%!');
  $('.score').append(link)
};

$(document).ready(function(){
  if ($('.question').length ==! 0) {
    getNextQuestion();
  }
});
