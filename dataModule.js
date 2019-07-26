var dataModule = (function() {
    //shufle function
    var shuffle = function(array) {
        var newArray = [];
        var randomIndex;
        var randomElements;
        while (array.length > 0) {
            randomIndex = Math.floor(Math.random() * array.length);
            randomElements = array[randomIndex];
            newArray.push(randomElements);
            array.splice(randomIndex, 1);
        }
        return newArray;
    };

    //capitalize first letter of a string
    String.prototype.capitalize = function() {
        var newString = "";
        var firstCharCap = this.charAt(0).toUpperCase();
        var remainingChar = this.slice(1);
        newString = firstCharCap + remainingChar;
        return newString;
    };

    //capitalize random function
    var capitalizeRandom = function(arrayOfStrings) {
        return arrayOfStrings.map(function(currentWord) {
            var x = Math.floor(Math.random()*4);
            return (x == 3) ? currentWord.capitalize() : currentWord;
        });
    };


    var appData = {
        indicators: {
            testStarted: false,
            testEnded: false,
            totalTestTime: 0,
            timeLeft: 0
        },
        results: {
            wpm: 0,
            wpmChange: 0,
            cpm: 0,
            cpmChange: 0,
            accuracy: 0,
            accuracyChange: 0,
            numOfCorrectWords: 0,
            numOfCorrectCharacters: 0,
            numOfTestCharacters: 0
        },
        words: {
            currentWordIndex: 0,
            testWords: [],
            currentWord: {}
        }
    };

    //word constructor
    //    {
    //      value: {correct: '', user: '' , isCorrect: false },
    //      characters: {correct: [], user: [], totalCorrect: 0, totalTest: 0 }
    //    }

    var word = function(index) {};

    //update method
    word.prototype.update = function(value) {};

    return {
        //indicators - test Control

        setTestTime: function(x) {}, //sets the total test time to x

        initializeTimeLeft() {}, //initializes time left to the total test time

        startTest: function() {}, //starts the test

        endTest: function() {}, //ends the test

        getTimeLeft: function() {}, //return the remaining test time

        reduceTime: function() {}, // reduces the time by one sec

        timeLeft() {}, //checks if there is time left to continue the test

        testEnded() {}, //checks if the test has already ended

        testStarted() {}, //checks if the test has started

        //results

        calculateWpm: function() {}, //calculates wpm and wpmChange and updates them in appData

        calculateCpm: function() {}, //calculates cpm and cpmChange and updates them in appData

        calculateAccuracy: function() {}, //calculates accuracy and accuracyChange and updates them in appData

        //test words
        // fills words.testWords
        fillListOfTestWords(textNumber, words) {
            var result = words.split("");
            if (textNumber == 0) {
                //shuffle words
                //capitailse random strings
                //add random punctuation
            }
            appData.words.testWords = result;
        },

        getListofTestWords() {}, // get list of test words: words.testWords

        moveToNewWord: function() {}, // increments the currentWordIndex - updates the current word (appData.words.currentWord) by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters

        updateCurrentWord: function(value) {} // updates current word using user input
    };
})();
