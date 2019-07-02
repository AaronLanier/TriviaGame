console.log("test");


$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $(document).ready( gameInfo.playGame);
    $(document).on('click' , '.option', gameInfo.checkGuess);
    $('#start').hide();
    // $('#start').on('click' , '#start', gameInfo.playGame)
    
  })
  
  var gameInfo = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions options and answers
    questions: {
      number1: 'What alias does Frodo go by when venturing out of the Shire?',
      number2: 'How many rings of power were made?',
      number3: 'Who in the Fellowship becomes corrupted by the Ring?',
      number4: 'how many hobits originally set out of the shire?',
      number5: "What is the name of Gandalf's horse?",
      number6: 'What race did the Nazgul used to be?',
      number7: 'What is the first voice we hear in The Fellowship of the Ring?'
    },
    options: {
      number1: ['Underhill', 'Tookman', 'Elwen', 'Shadowfax'],
      number2: ['1', '8', '20', '22'],
      number3: ['Gimli', 'Boromir', 'Legolas', 'Gandalf'],
      number4: ['3', '2', '4', '1'],
      number5: ['Lightfoot','Stormguard','Shadowfax','Orcbane'],
      number6: ['Elves','Men','Dwarf','Hobit'],
      number7: ['Frodo', 'Gandalf', 'Galadriel','Bilbo']
    },
    answers: {
      number1: 'Underhill',
      number2: '20',
      number3: 'Boromir',
      number4: '2',
      number5: 'Shadowfax',
      number6: 'Men',
      number7: 'Galadriel'
    },
    // trivia methods
    // method to initialize game
    playGame: function(){
      // restarting game results
      gameInfo.currentSet = 0;
      gameInfo.correct = 0;
      gameInfo.incorrect = 0;
      gameInfo.unanswered = 0;
      clearInterval(gameInfo.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(gameInfo.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      gameInfo.newQuestion();
      
    },
    // method to loop through and display questions and options 
    newQuestion : function(){
      
      // set timer to 20 seconds each question
      gameInfo.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(gameInfo.timer);
      
      // to prevent timer speed up
      if(!gameInfo.timerOn){
        gameInfo.timerId = setInterval(gameInfo.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(gameInfo.questions)[gameInfo.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(gameInfo.options)[gameInfo.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(gameInfo.timer > -1 && gameInfo.currentSet < Object.keys(gameInfo.questions).length){
        $('#timer').text(gameInfo.timer);
        gameInfo.timer--;
          if(gameInfo.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(gameInfo.timer === -1){
        gameInfo.unanswered++;
        gameInfo.result = false;
        clearInterval(gameInfo.timerId);
        resultId = setTimeout(gameInfo.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(gameInfo.answers)[gameInfo.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(gameInfo.currentSet === Object.keys(gameInfo.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ gameInfo.correct +'</p>'+
          '<p>Incorrect: '+ gameInfo.incorrect +'</p>'+
          '<p>Unanswered: '+ gameInfo.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
        
        
      }
      
    },
    // method to evaluate the option clicked
    checkGuess : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(gameInfo.answers)[gameInfo.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        gameInfo.correct++;
        clearInterval(gameInfo.timerId);
        resultId = setTimeout(gameInfo.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        gameInfo.incorrect++;
        clearInterval(gameInfo.timerId);
        resultId = setTimeout(gameInfo.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      gameInfo.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      gameInfo.newQuestion();
       
    }
   
  }
  $(document).on('click' , '#start', gameInfo.playGame)