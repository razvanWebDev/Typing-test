var eventsModule = (function(dModule, uModule, cModule, wModule) {
    var addEventListeners = function() {
        //character typing event listener
        uModule
            .getDOMElements()
            .textInput.addEventListener("input", function(event) {
                //check if test ended, do nothing
                if (dModule.testEnded()) {
                    return;
                }

                //if test has not started yet, start test,countdown
                if (!dModule.testStarted()) {
                    //start the test
                }

                //get typed word
                var typedWord = uModule.getTypedWord();

                //update current word
                dModule.updateCurrentWord(typedWord);

                //format active word
                var currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);

                //check if the user pressed space or enter
                if (uModule.spacePressed(event) || uModule.enterPressed()) {
                    //empty  text input
                    uModule.emptyInput();

                    //deactivate current word
                    uModule.deactivateCurrentWord();

                    //move to a new word
                    dModule.moveToNewWord();

                    //set active word
                    var index = dModule.getCurrentWordIndex();
                    uModule.setActiveWord(index);

                    //format active word
                    var currentWord = dModule.getCurrentWord();
                    uModule.formatWord(currentWord);

                    //scroll new word into view
                }
            });
        //click on download button event listener
        //click on restart button event listener
    };

    return {
        //init function, initializes the test before start
        init: function(duration, textNumber) {
            //fill list of testwords
            var lineReturn = dModule.getLineReturn();
            var words = wModule.getWords(textNumber);
            dModule.fillListOfTestWords(textNumber, words);
            var testWords = dModule.getListofTestWords();
            uModule.fillContent(testWords, lineReturn);

            //set the total test time
            dModule.setTestTime(duration);

            //update the time left
            dModule.initializeTimeLeft();

            var timeLeft = dModule.getTimeLeft();
            uModule.updateTimeLeft(timeLeft);

            //move to a new word
            dModule.moveToNewWord();

            //set active word
            var index = dModule.getCurrentWordIndex();
            uModule.setActiveWord(index);

            //format active word
            var currentWord = dModule.getCurrentWord();
            uModule.formatWord(currentWord);

            //focus on the input
            uModule.inputFocus();

            //add event listeners

            addEventListeners();
        }
    };
})(dataModule, UIModule, certificateModule, wordsModule);
