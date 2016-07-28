$(document).ready(function(){
  addQuestion();
  addAnswers();
  setScore();
  chooseAnswer();
  randomize();
});

var clickCount = 0;
var questionCount = 0;
var score = 0;
var setScore = function() {
  if (clickCount < 1) {
    $(".score").html("<p>" + score + " points</p>");
  }
};

var triviaPrompts = [
  [ "How many times have the Olympics been held in South America before 2016?", ["Once", "Twice", "Never"], "C", ["A", "B"] ],
  [ "Which events are included for the first time in decades?", ["Golf & Cycling-BMX", "Rugby & Golf", "Rugby & Cricket"], "B", ["A", "C"] ],
  [ "What is lit with a flame during the opening ceremony?", ["The Olympic Cauldron", "The Olympic Mascot", "The Olympic Torch"], "C", ["A", "B"] ],
  [ "The torch relay began on April 21st in which city?", ["Olympia", "Rio de Janeiro", "London"], "A", ["B", "C"] ],
  [ "Organizers prepare approximately how many meals per day to feed athletes?", ["5,000", "60,000", "30,000"], "B", ["A", "C"] ],
  [ "Which is one of the venues for the Rio Olympics?", ["The Olympic Golf Course", "The Olympic Village", "The Olympic Parade"], "A", ["B", "C"] ],
  [ "The first refugee team to ever compete at the Olympic Games competes under which flag?", ["Olympic", "Greece", "Brazil"], "A", ["B", "C"] ],
  [ "Which two types of martial arts are represented in the Summer Olympics?", ["Kung Fu & Tai Chi Chuan", "Karate & Ninjitsu", "Taekwondo & Judo"], "C", ["A", "B"] ],
  [ "The beach volleyball tournament is held at?", ["Fort Copacabana", "Copacabana Beach", "The Copacabana Club"], "B", ["A", "C"] ],
  [ "Where are the opening and closing ceremonies held?", ["Joao Havelange Olympic Stadium", "Maracana Stadium", "Maracanazinho Arena"], "B", ["A", "C"] ],
  ["How many gold medals will be handed out during at the 2016 Summer Olympics?",
  ["306", "256", "400"], "A", ["B", "C"] ],
  ["What is the motto for the 2016 Summer Olympics?",
  ["One World. One Dream.", "Light the Fire Within", "Live your passion"], "C", ["A", "B"] ],
  ["What is the estimated cost in U.S. dollars of the 2016 Summer Olympics?",
  ["$6.25 billion", "$11.25 billion", "$22.25 billion"], "B", ["A", "C"] ],
  ["When will the 2016 Summer Games end?",
  ["October 15th", "September 2nd", "August 21st"], "C", ["A", "B"] ],
  ["Rio's taxi drivers, or 'taxistas', were given the chance to sign up for free online English lessons provided by the Rio 2016 Organizing Committee?", ["True", "False"], "A", ["B"] ],
  "There will be a total of 28 sports in the 2016 Summer Olympics?", ["True", "False"], "A", ["B"] ],
  ["The official mascots of the 2016 Summer Olympics are Vinicius and Tom?", ["True", "False"], "A", ["B"] ],
  ["There will be less than 10,000 athletes participating in the 2016 Summer Olympics?", ["True", "False"], "B", ["A"] ],
  ["In what year was Fannie Mae founded?", ["1935", "1938", "1941"], "B", ["A", "C"] ],
  ["The correct spelling of Tim's last name is:", ["Mayopoulos", "Myopoulous", "Mayopoulus"], "A", ["B", "C"] ],
  ["Our vision is to be America's most valued _________ partner", ["Lending", "Mortgage", "Housing"], "C", ["A", "B"] ],
  ["The new Fannie Mae office address will be [PLEASE ENTER NEW ADDRESS ex. 1501 L Street NW].",
  ["True", "False"], "B", ["A"] ],
];

var addQuestion = function() {
  console.log(questionCount);
  $(".question").text(triviaPrompts[questionCount][0]);
};

var addAnswers = function(){
  $("#A").text( triviaPrompts[questionCount][1][0] );
  $("#B").text( triviaPrompts[questionCount][1][1] );
  $("#C").text( triviaPrompts[questionCount][1][2] );
};

var chooseAnswer = function(){

  var rightAnswer = function() {
    if (clickCount < 1) {
    $(this).css("color", "white");
      $("#" + triviaPrompts[questionCount][3][0]).css("color", "grey");
      $("#" + triviaPrompts[questionCount][3][1]).css("color", "grey");
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Right!");
      score = score + 1;
    }
    setScore();
    clickCount++;
    $(".next").show();
  };

  var wrongAnswer = function () {
    if (clickCount < 1) {
    $(".answer").css("color", "grey");
    $(this).css("color", "white");
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("Nope, it was " +  $("#" + triviaPrompts[questionCount][2]).text() + ".");
    clickCount++;
    $(".next").show();
    }
  };

  var answerChoices = function() {
    $(".answer").off("click");
    $("#" + triviaPrompts[questionCount][2]).on("click", rightAnswer);
    $("#" + triviaPrompts[questionCount][3][0]).on("click", wrongAnswer);
    $("#" + triviaPrompts[questionCount][3][1]).on("click", wrongAnswer);
  };

  answerChoices();
};


  var random = Math.floor(Math.random() * triviaPrompts.length);

function randomize(){
  random = Math.floor(Math.random() * triviaPrompts.length);
}

var onNext = function(){
  questionCount++;
  if ( questionCount <= (triviaPrompts.length-1)) {
    randomize();
    addQuestion();
    addAnswers();
    $(".right-or-wrong").hide();
    $(".next").hide();
    $(".answer").css("color", "black");
    clickCount = 0;
    chooseAnswer();
  }

  if ( questionCount == 3 ) {
      $(".next").html("Game over! " + " <p class = 'fa fa-play-circle'></p>");
  } else if ( questionCount > (triviaPrompts.length-1 ) ) {
    console.log("game over!");
  }

};

$(".next").on("click", onNext);
$("html").on("keydown", function(e){
  if ($(".next").css("display") !== "none"){
    if (e.keyCode == 13) {
      onNext();
    }
  }
});
