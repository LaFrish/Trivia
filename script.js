var clickCount = 0;
var questionCount = 0;
var score = 0;
var i = 0;
var reloading = document.getElementById('reload');
var setScore = function() {
  if (clickCount < 1) {
    $(".score").html("<p>Score: " + score + "</p>");
  }
};


jQuery(document).ready(function($){
    $('body').on('click', '#reset',function (){
        clickCount = 0;
questionCount = 0;
score = 0;
i = 0;
     $('.is-visible').removeClass('is-visible');
    addQAs();
    setScore();
    chooseAnswer();

  });

	//open popup
	$('.cd-popup-trigger').on('click', function(){
		// event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});

	//close popup
	$('#reset').on('click', function(){
  $('.cd-popup').removeClass('is-visible');
  reset()
})

	// 	if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
	// 		event.preventDefault();
	// 		$(this).removeClass('is-visible');
   //
	//  };


	// close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
});

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

  ["What is the motto for the 2016 Summer Olympics?", ["One World. One Dream.", "Light the Fire Within", "Live your passion"], "C", ["A", "B"] ],

  ["What is the estimated cost in U.S. dollars of the 2016 Summer Olympics?", ["$6.25 billion", "$11.25 billion", "$22.25 billion"], "B", ["A", "C"] ],

  ["When will the 2016 Summer Games end?", ["October 15th", "September 2nd", "August 21st"], "C", ["A", "B"] ],

  ["In what year was Fannie Mae founded?", ["1935", "1938", "1941"], "B", ["A", "C"] ],

  ["The correct spelling of Tim's last name is:", ["Mayopoulos", "Myopoulous", "Mayopoulus"], "A", ["B", "C"] ],

  ["Our vision is to be America's most valued _________ partner", ["Lending", "Mortgage", "Housing"], "C", ["A", "B"] ],

  ["The Dallas area office is being built in", ["Addison", "Plano", "Farmer's Branch"], "B", ["A", "C"] ],

  ["How many Fannie Mae employees are located in the Dallas area?", ["200", "2000", "3000"], "B", ["A", "C"] ],

  ["The Fannie Mae Values include:", ["We rock the house", "We lead the market", "We serve your friends & family"], "B", ["A", "C"] ],

  ["The Fannie Mae Values include:", ["We get things done & done right", "We do things right the 1st time", "We can count on you"], "A", ["B", "C"] ],

  ["The Fannie Mae Values include:", ["We are stronger together", "We value our people and our communities", "We are simple, certain and dynamic"], "A", ["B", "C"] ],

  ["Besides the CEO, there are ___ members of the Management Committee.",["10", "12", "15"], "A", ["B", "C"] ],

  ["There are ____ Employee Resource Groups.", ["15", "12", "10"], "C", ["A", "B"] ],

  ["The following is an Employee Resource Group", ["Friends of Ted", "Animal Lovers", "Christian Salt & Light"], "C", ["A", "B"] ],

  ["There are ____ Change Ambassadors across the enterprise?", ["100", "80", "130"], "C", ["A", "B"] ],

  ["What does CPM stand for?",["Credit Per Month", "Credit Portfolio Management", "Customer Performance Management"], "B", ["A", "C"] ],

  ["Which of the following people are MC members?", ["Jeff Haywood", "Joy Behard", "Kimberly Johnson"], "C", ["A", "B"] ],

  ["Our CEO Tim grew up in which state?", ["Nebraska", "Pennsylvania", "New York"], "B", ["A", "C"] ],

  ["Reasons to go to a Tech Center include:", ["Hardware issues", "Researching accessories", "Mobile device applications"], "A", ["B", "C"] ],

  ["Useful Links on HomeSite include:", ["Brand Center", "Restaurant Menu", "Beat the Heat"], "A", ["B", "C"] ],

  ["Collaboration tools at Fannie Mae include:", ["Jawbone", "Jabber", "Jingle"], "B", ["A", "C"] ],

  ["Projects underway at Fannie Mae include:", ["Workstation  Management", "Workplace in the Cloud", "Workplace  Transformation"], "C", ["A", "B"] ],

  ["We are the ______ at the heart of housing.", ["Beat", "Hub", "Brain"], "A", ["B", "C"] ],

  ["Rio's taxi drivers, or 'taxistas', were given the chance to sign up for free online English lessons provided by the Rio 2016 Organizing Committee?", ["True", "--or--", "False" ], "A", ["B", "C"] ],

  ["There will be a total of 28 sports in the 2016 Summer Olympics?", ["True", "--or--", "False" ], "A", ["B", "C"] ],

  ["The official mascots of the 2016 Summer Olympics are Vinicius and Tom?", ["True", "--or--", "False" ], "A", ["B", "C"] ],

  ["There will be less than 10,000 athletes participating in the 2016 Summer Olympics?", ["True", "--or--", "False" ], "B", ["A", "C"] ],

  ["The new Fannie Mae DC office address will be 1100 15th Street NW.", ["True", "--or--", "False" ], "A", ["B", "C"] ],

  ["Standardization, Transparency and Resilience are guiding principles for Workplace Transformation?", ["True", "--or--", "False" ], "A", ["B", "C"] ],

  ["The following are Employee Resource Groups: Young Professionals, Asian, Live Openly and POP", ["True", "--or--", "False" ], "A", ["B", "C"] ],

  ["The Coffee Bistro serves Peet’s Coffee.", ["True", "--or--", "False" ], "B", ["A", "C"] ]
];


function addQAs (){
questionCount = Math.floor(Math.random() * triviaPrompts.length);
$(".question").text(triviaPrompts[questionCount][0]);
$("#A").text( triviaPrompts[questionCount][1][0] );
$("#B").text( triviaPrompts[questionCount][1][1] );
$("#C").text( triviaPrompts[questionCount][1][2] );
};


var chooseAnswer = function(){

var rightAnswer = function() {
    if (clickCount < 1) {
      $("#" + triviaPrompts[questionCount][2]).css("color", "green"); // replace this code
      $("#" + triviaPrompts[questionCount][3][0]).css("color", "grey");
      $("#" + triviaPrompts[questionCount][3][1]).css("color", "grey");
      $(".right-or-wrong").show();
      $(".right-or-wrong").text("You are correct!");
      score = score + 1;
    }
    setScore();
    clickCount++;
    $(".next").show();
  };

  var wrongAnswer = function () {
    if (clickCount < 1) {
    $(".answer").css("color", "grey"); //(2)
    $(this).css("color", "red"); // (1)
    $(".right-or-wrong").show();
    $(".right-or-wrong").text("That is wrong! The correct answer is " +  $("#" + triviaPrompts[questionCount][2]).text() + ".");
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

// clicking next div will progress to the next question and reset for each question, which will:
// (1) hide the right/wrong box
// (2) change answer choice text color back to black
// (3) hide the next box, etc.

var onNext = function(){
  // var random = Math.floor(Math.random() * (triviaPrompts.length));
  questionCount++;
  if ( questionCount <= (triviaPrompts.length-1)) {
    addQAs();
    $(".right-or-wrong").hide();
    $(".next").hide();
    $(".answer").css("color", "white");
    clickCount = 0;
    chooseAnswer();
  }

//end after 3 questions
    if (questionCount === 3 ) {
      $(document).ready(function () {
        if (score=== 3){
          $('.cd-popup3').addClass('is-visible');
        } else if ( score === 2) {
      $('.cd-popup2').addClass('is-visible');
    } else if  (score ===1){
      $('.cd-popup1').addClass('is-visible');
    } else {
      $('.cd-popup').addClass('is-visible');
    }

    })
    }
  }

// goes to next question on click AND on keydown - enter key
$(".next").on("click", onNext);
$("html").on("keydown", function(e){
  if ($(".next").css("display") !== "none"){
    if (e.keyCode == 13) {
      onNext();
    }
  }
});

addQAs();
setScore();
chooseAnswer();
// reset();
