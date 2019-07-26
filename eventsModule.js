var eventsModule = (function(dModule, uModule, cModule, wModule) {
    var addEventListeners = function() {
        //character typing event listener
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
            var testWords = dModule.getListofTestWords() ;
            uModule.fillContent(testWords, lineReturn);
            //set the total test time

            //update the time left

            //move to a new word

            //set active word

            //format active word

            //focus on the input

            //add event listeners

            addEventListeners();
        }
    };
})(dataModule, UIModule, certificateModule, wordsModule);
