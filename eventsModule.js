var eventsModule = (function(dModule, uModule, cModule, wModule) {
    var addEventListeners = function() {
        //enter click event
        uModule
            .getDOMElements()
            .textInput.addEventListener("keydown", function(event) {
                //check if test ended, do nothing
                if (dModule.testEnded()) {
                    return;
                }

                //check if the user pressed enter
                var key = event.keyCode;
                if (key == 13) {
                    uModule.getDOMElements().textInput.value +=
                        dModule.getLineReturn() + " ";

                    //create a new input event
                    var inputEvent = new Event("input");
                    uModule
                        .getDOMElements()
                        .textInput.dispatchEvent(inputEvent);
                }

                //createa new input event
            });

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
                    dModule.startTest();
                    //start counter
                    //calculate results in data module
                    var b = setInterval(function() {
                        var results = {};
                        [
                            results.wpm,
                            results.wpmChange
                        ] = dModule.calculateWpm();

                        [
                            results.cpm,
                            results.cpmChange
                        ] = dModule.calculateCpm();

                        [
                            results.accuracy,
                            results.accuracyChange
                        ] = dModule.calculateAccuracy();

                        //update results in ui module
                        uModule.updateResults(results);

                        //update timeleft
                        if (dModule.timeLeft()) {
                            var timeLeft = dModule.reduceTime();
                            uModule.updateTimeLeft(timeLeft);
                        } else {
                            //end test
                            clearInterval(b);
                            dModule.endTest();
                            dModule.returnData();

                            //fill modal
                            uModule.fillModal(results.wpm);
                            //display modal
                            uModule.showModal();
                        }
                    }, 1000);
                }

                //get typed word
                var typedWord = uModule.getTypedWord();

                //update current word
                dModule.updateCurrentWord(typedWord);

                //format active word
                var currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);

                //check if the user pressed space or enter
                if (
                    uModule.spacePressed(event) ||
                    uModule.enterPressed(dModule.getLineReturn())
                ) {
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
                    uModule.scroll();
                }
            });
        //click on download button event listener
        uModule
            .getDOMElements()
            .download.addEventListener("click", function(event) {
                if (uModule.isNameEmpty()) {
                    uModule.flagNameInput();
                } else {
                    var certificateData = dModule.getCertificateData();
                    certificateModule.generateCertificate(certificateData);
                }
            });
    };

    //scroll active word into middleview on window resize
    window.addEventListener("resize", uModule.scroll);

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
