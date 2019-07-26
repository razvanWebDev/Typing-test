var UIModule = (function() {
    //classes used to select HTML elements
    var DOMElements = {
        //indicators - test control
        timeLeft:"", //HTML element displaying time left
        //test results
        wpm:"",
        wpmChange:"",
        cpm:"",
        cpmChange:"",
        accuracy:"",
        accuracyChange:"",
        //user input
        textInput:"",
        nameInput:"",
        //test words
        content:document.getElementById('content'),
        activeWord:"",
        //modal
        modal:""
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

        getDOMElements() {},

        //Indicators - Test Control

        updateTimeLeft: function() {},

        //results

        updateResults: function() {},

        fillModal: function() {},

        showModal: function() {},

        //user input

        inputFocus: function() {},

        isNameEmpty: function() {},

        flagNameInput: function() {},

        spacePressed: function() {},

        enterPressed: function() {},

        emptyInput: function() {},

        getTypedWord: function() {},

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
            content = content.split("<span> " + lineReturn + "</span>").join("<span>&#8629</span>");
            //fill content
            DOMElements.content.innerHTML = content;

        },

        formatWord: function(wordObject, wordHTML) {},

        setActiveWord: function(index) {},

        deactivateCurrentWord: function() {},

        scroll: function() {}
    };
})();
