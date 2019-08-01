var dataModule = (function() {
    var lineReturn = "|";
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
            var x = Math.floor(Math.random() * 4);
            return x == 3 ? currentWord.capitalize() : currentWord;
        });
    };

    //add random punctuation function
    var addRandomPunctuation = function(arrayOfStrings) {
        return arrayOfStrings.map(function(currentWord) {
            var randomPunctuation;
            var items = [
                lineReturn,
                lineReturn,
                "?",
                "?",
                "?",
                "?",
                "?",
                ",",
                ",",
                ",",
                ",",
                ",",
                ",",
                ",",
                ".",
                ".",
                ".",
                ".",
                ".",
                ".",
                "!",
                "!",
                "!",
                "!",
                "!",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ];
            var randomIndex = Math.floor(Math.random() * items.length);
            randomPunctuation = items[randomIndex];
            return currentWord + randomPunctuation;
        });
    };

    //character callback used to calculate nr of correct character inside the current word
    var nrOfCorrectChars;
    var charCallBack = function(currentElement, index) {
        nrOfCorrectChars +=
            currentElement == this.characters.user[index] ? 1 : 0;
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
            currentWordIndex: -1,
            testWords: [],
            currentWord: {}
        }
    };

    //word constructor
    //    {
    //      value: {correct: '', user: '' , isCorrect: false },
    //      characters: {correct: [], user: [], totalCorrect: 0, totalTest: 0 }
    //    }

    var word = function(index) {
        //word values correct vs user
        this.value = {
            correct: appData.words.testWords[index] + " ",
            user: "",
            isCorrect: false
        };

        //characters values correct vs user
        this.characters = {
            correct: this.value.correct.split(""),
            user: [],
            totalCorrect: 0,
            totalTest: this.value.correct.length
        };
    };

    //update method
    word.prototype.update = function(value) {
        this.value.user = value;

        this.value.isCorrect = this.value.correct == this.value.user;
        this.characters.user = this.value.user.split("");

        nrOfCorrectChars = 0;
        charCallBack = charCallBack.bind(this);
        this.characters.correct.forEach(charCallBack);

        this.characters.totalCorrect = nrOfCorrectChars;
    };

    return {
        //indicators - test Control

        //sets the total test time to x
        setTestTime: function(x) {
            appData.indicators.totalTestTime = x;
        },

        //initializes time left to the total test time
        initializeTimeLeft() {
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        },

        //starts the test
        startTest: function() {
            appData.indicators.testStarted = true;
        },

        endTest: function() {}, //ends the test

        //return the remaining test time
        getTimeLeft: function() {
            return appData.indicators.timeLeft;
        },

        reduceTime: function() {}, // reduces the time by one sec

        timeLeft: function() {}, //checks if there is time left to continue the test

        //checks if the test has already ended
        testEnded: function() {
            return appData.indicators.testEnded;
        },

        testStarted: function() {}, //checks if the test has started

        //results

        //calculates wpm and wpmChange and updates them in appData
        calculateWpm: function() {
            var wpmOld = appData.results.wpm;
            var numOfCorrectWords = appData.results.numOfCorrectWords;
            if (
                appData.indicators.timeLeft != appData.indicators.totalTestTime
            ) {
                Math.round(
                    (appData.results.wpm =
                        (60 * numOfCorrectWords) /
                        (appData.indicators.totalTestTime -
                            appData.indicators.timeLeft))
                );
            } else {
                appData.results.wpm = 0;
            }
            appData.results.wpmChange = appData.results.wpm - wpmOld;
            return [appData.results.wpm, appData.results.wpmChange];
        },

        calculateCpm: function() {}, //calculates cpm and cpmChange and updates them in appData

        calculateAccuracy: function() {}, //calculates accuracy and accuracyChange and updates them in appData

        //test words
        // fills words.testWords
        fillListOfTestWords: function(textNumber, words) {
            var result = words.split(" ");
            if (textNumber == 0) {
                //shuffle words
                result = shuffle(result);
                //capitailse random strings
                result = capitalizeRandom(result);
                //add random punctuation
                result = addRandomPunctuation(result);
            }
            appData.words.testWords = result;
        },

        // get list of test words: words.testWords
        getListofTestWords() {
            return appData.words.testWords;
        },

        // increments the currentWordIndex - updates the current word (appData.words.currentWord) by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters
        moveToNewWord: function() {
            if (appData.words.currentWordIndex > -1) {
                //update nr of corect words
                if (appData.words.currentWord.value.isCorrect == true) {
                    appData.results.numOfCorrectWords++;
                }
                //update nr of corect characters
                appData.results.numOfTestCharacters += appData.words.currentWord.characters.totalCorrect;
                //update nr of corect test characters
                appData.results.numOfTestCharacters += appData.words.currentWord.characters.totalTest;
            }
            appData.words.currentWordIndex++;
            var currentIndex = appData.words.currentWordIndex;
            var newWord = new word(currentIndex);
            appData.words.currentWord = newWord;
        },
        //updade current wordindex
        getCurrentWordIndex() {
            return appData.words.currentWordIndex;
        },

        //get current word
        getCurrentWord() {
            var currentWord = appData.words.currentWord;
            return {
                value: {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user
                }
            };
        },

        // updates current word using user input
        updateCurrentWord: function(value) {
            appData.words.currentWord.update(value);
        },

        getLineReturn() {
            return lineReturn;
        },

        returnData() {
            console.log(appData);
        }
    };
})();
