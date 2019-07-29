var UIModule = (function() {
    //classes used to select HTML elements
    var DOMElements = {
        //indicators - test control
        timeLeft: document.getElementById("timeLeft"),
        //test results
        wpm: document.getElementById("wpm"),
        wpmChange: document.getElementById("wpmChange"),
        cpm: document.getElementById("cpm"),
        cpmChange: document.getElementById("cpmChange"),
        accuracy: document.getElementById("accuracy"),
        accuracyChange: document.getElementById("accuracyChange"),
        //user input
        textInput: document.getElementById("input"),
        nameInput: document.getElementById("name"),
        //test words
        content: document.getElementById("content"),
        activeWord: "",
        //modal
        modal: document.getElementById("myModal")
    };

    var splitArray = function(string) {
        return string.split("");
    };

    var addSpace = function(array) {
        array.push(" ");
        return array;
    };

    var addSpan = function(array) {
        return array.map(function(currentChar) {
            return "<span>" + currentChar + "</span>";
        });
    };

    var addWordSpan = function(array) {
        array.unshift("<span>");
        array.push("</span>");
        return array;
    };

    var joinEachWord = function(array) {
        return array.join("");
    };

    return {
        //get DOM elements

        getDOMElements() {
            return {
                textInput: DOMElements.textInput
            }
        },

        //Indicators - Test Control

        updateTimeLeft: function(x) {
            DOMElements.timeLeft.innerHTML = x;
        },

        //results

        updateResults: function() {},

        fillModal: function() {},

        showModal: function() {},

        //user input

        inputFocus: function() {
            DOMElements.textInput.focus();
        },

        isNameEmpty: function() {},

        flagNameInput: function() {},

        spacePressed: function() {},

        enterPressed: function() {},

        emptyInput: function() {},

        getTypedWord: function() {
            return DOMElements.textInput.nodeValue;
        },

        //test words

        fillContent: function(array, lineReturn) {
            var content = array.map(splitArray);
            content = content.map(addSpace);
            content = content.map(addSpan);
            content = content.map(addWordSpan);
            content = content.map(joinEachWord);
            content = content.join("");

            //replace the line return special code with the HTML entity
            // content = content.replace('<span>|</span>', '<span>&crarr</span>')
            content = content
                .split("<span> " + lineReturn + "</span>")
                .join("<span>&#8629</span>");
            //fill content
            DOMElements.content.innerHTML = content;
        },

        formatWord: function(wordObject) {
            var activeWord = DOMElements.activeWord;
            //highlight word
            activeWord.className = "activeWord";

            //format individual character
        },

        setActiveWord: function(index) {
            DOMElements.activeWord = DOMElements.content.children[index];
        },

        deactivateCurrentWord: function() {},

        scroll: function() {}
    };
})();
