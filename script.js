$(document).ready(function(){
  addQuestion();
  addAnswers();
  setScore();
  chooseAnswer();
});

var clickCount = 0; //clicks per question should never exceed 1
var questionCount = 0;
var score = 0;
var setScore = function() {
  if (clickCount < 1) {
    $(".score").html("<p>" + score + " points</p>");
  }
};

var triviaPrompts = [
  // Format: [ question, answer choices[A, B, C], right answer, wrong answers[1, 2] ]
  [ "How many times had the Olympics been held in South America before 2016?", ["Once", "Twice", "Never"], "C", ["A", "B"] ],
  [ "Which are being included for the first time in many decades?", ["Golf & BMX Bike", "Rugby & Golf", "Rugby & Cricket"], "B", ["A", "C"] ],
  [ "What will be lit with a flame during the opening ceremony?", ["The Olympic Cauldron", "The Olympic Mascot", "The Olympic Torch"], "C", ["A", "B"] ],
  [ "The torch relay will begin on April 21st in what city?", ["Olympia", "Rio de Janeiro", "London"], "A", ["B", "C"] ],
  [ "Organizers will prepare approximately how many meals per day to feed athletes?", ["5,000", "60,000", "30,000"], "B", ["A", "C"] ],
  [ "Which is one of the venues for the Rio Olympics?", ["The Olympic Golf Course", "The Olympic Village", "The Olympic Parade"], "A", ["B", "C"] ],
  [ "The first refugee team to ever compete at the Olympic Games will be competing under which flag?", ["Olympic", "Greece", "Olympic"], "A", ["B", "C"] ],
  [ "Which two types of martial arts are represented in the Summer Olympics?", ["Kung Fu & Tai Chi Chuan", "Karate & Ninjitsu", "Taekwondo & Judo"], "C", ["A", "B"] ],
  [ "The beach volleyball tournament is being held at?", ["Fort Copacabana", "Copacabana Beach", "The Copacabana Club"], "B", ["A", "C"] ],
  [ "Where are the opening and closing ceremonies being held?", ["Joao Havelange Olympic Stadium", "Maracana Stadium", "Maracanazinho Arena"], "B", ["A", "C"] ],
  ["How many gold medals will be handed out during at the 2016 Summer Olympics?",
  ["306", "256", "400"], "A", ["B", "C"] ],
  ["What is the motto for the 2016 Summer Olympics?",
  ["One World. One Dream.", "Light the Fire Within", "Live your passion"], "C", ["A", "B"] ],
  ["What is the estimated cost of the 2016 Summer Olympics?",
  ["6.25 billion", "11.25 billion", "22.25 billion"], "B", ["A", "C"] ],
  ["When will the 2016 Summer Games end?",
  ["October 15th", "September 2nd", "August 21st"], "C", ["A", "B"] ],
];

// adds the question string to the question div
var addQuestion = function() {
  console.log(questionCount);
  $(".question").text(triviaPrompts[questionCount][0]);
};

// adds the answer choices to 3 answer divs
var addAnswers = function(){
  $("#A").text( triviaPrompts[questionCount][1][0] );
  $("#B").text( triviaPrompts[questionCount][1][1] );
  $("#C").text( triviaPrompts[questionCount][1][2] );
};

var chooseAnswer = function(){

  // clicking a CORRECT answer div:
  // (1) changes the text color to white,
  // (2) changes other answers to grey,
  // (3) shows if right/wrong & score
  var rightAnswer = function() {
    if (clickCount < 1) {
    $(this).css("color", "white"); // (1)
      //change other answers to grey
      $("#" + triviaPrompts[questionCount][3][0]).css("color", "grey");
      $("#" + triviaPrompts[questionCount][3][1]).css("color", "grey"); //(2)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Right!");
      score = score + 1;
    }
    setScore();
    clickCount++;
    $(".next").show();
  };

  // clicking on a WRONG answer div: (1), (2), and (3) remain the same with different right-or-wrong text and different score
  var wrongAnswer = function () {
    if (clickCount < 1) {
    $(".answer").css("color", "grey"); //(2)
    $(this).css("color", "white"); // (1)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Nope, it was " +  $("#" + triviaPrompts[questionCount][2]).text() + ".");
    clickCount++;
    $(".next").show();
    }
  };

  // right/wrong changes occur when one of the answer choice divs is clicked
  var answerChoices = function() {
    $(".answer").off("click"); // removes any previously bound click event listeners
    $("#" + triviaPrompts[questionCount][2]).on("click", rightAnswer);
    $("#" + triviaPrompts[questionCount][3][0]).on("click", wrongAnswer);
    $("#" + triviaPrompts[questionCount][3][1]).on("click", wrongAnswer);
  };

  answerChoices();
};

// clicking next div will progress to the next question and reset for each question, which will:
// (1) hide the right/wrong box
// (2) change answer choice text color back to black
// (3) hide the next box, etc.
var onNext = function(){
  questionCount++;
  if ( questionCount <= (triviaPrompts.length-1)) {
    addQuestion();
    addAnswers();
    $(".right-or-wrong").hide();
    $(".next").hide();
    $(".answer").css("color", "black");
    clickCount = 0;
    chooseAnswer();
  }

// on last question, text in next div changes to "Game over!"
// clicking the div opens spoopy video (at game over)
  if ( questionCount == (triviaPrompts.length-1 ) ) {
      $(".next").html("Game over! " + " <p class = 'fa fa-play-circle'></p>");
  } else if ( questionCount > (triviaPrompts.length-1 ) ) {
    console.log("game over!");
    window.open("https://www.youtube.com/v/v4IC7qaNr7I&autoplay=1", "_blank");
  }

};

// goes to next question on click AND on keydown - enter key
$(".next").on("click", onNext);
$("html").on("keydown", function(e){
  if ($(".next").css("display") !== "none"){
    if (e.keyCode == 13) {
      onNext();
    }
  }
});
