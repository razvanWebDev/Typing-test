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

    var userValue;
    var returnCharClass = function(currentChar, index) {
        return index < userValue.length
            ? currentChar == userValue[index]
                ? "correctCharacter"
                : "wrongCharacater"
            : "0";
    };

    var updateChange = function(value, changeElement) {
        //determine the class to add to the changeElement
        var classToAdd, html;
        [classToAdd, html] =
            value >= 0 ? ["scoreUp", "+" + value] : ["scoreDown", value];

        //add % to percentege change
        if (changeElement == DOMElements.accuracyChange) {
            html += "%";
        }

        //update change element
        changeElement.innerHTML = html;
        //style change element
        changeElement.removeAttribute("class");
        changeElement.className = classToAdd;

        //fade element
        fadeElement(changeElement);
    };

    var fadeElement = function(element) {
        element.style.opacity = 1;
        setTimeout(function(){
            element.style.opacity = 0.95;
        }, 100)
    };

    return {
        //get DOM elements

        getDOMElements: function() {
            return {
                textInput: DOMElements.textInput
            };
        },

        //Indicators - Test Control

        updateTimeLeft: function(x) {
            DOMElements.timeLeft.innerHTML = x;
        },

        //results

        updateResults: function(results) {
            //update wpm
            DOMElements.wpm.innerHTML = results.wpm;
            //update cpm
            DOMElements.cpm.innerHTML = results.cpm;
            //update accuracy
            DOMElements.accuracy.innerHTML = results.accuracy + "%";

            //update changes
            updateChange(results.wpmChange, DOMElements.wpmChange);
            updateChange(results.cpmChange, DOMElements.cpmChange);
            updateChange(results.accuracyChange, DOMElements.accuracyChange);
        },

        fillModal: function() {},

        showModal: function() {},

        //user input

        inputFocus: function() {
            DOMElements.textInput.focus();
        },

        isNameEmpty: function() {},

        flagNameInput: function() {},

        spacePressed: function(event) {
            return event.data == " ";
        },

        enterPressed: function(lineReturn) {
            return this.getTypedWord().includes(lineReturn + " ");
        },

        emptyInput: function() {
            DOMElements.textInput.value = "";
        },

        getTypedWord: function() {
            return DOMElements.textInput.value;
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
            content = content
                .split("<span>" + lineReturn + "</span>")
                .join("<span>&#8629</span>");
            //fill content
            DOMElements.content.innerHTML = content;
        },

        formatWord: function(wordObject) {
            var activeWord = DOMElements.activeWord;
            //highlight word
            activeWord.className = "activeWord";

            //format individual character
            var correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;

            var classes = Array.prototype.map.call(
                correctValue,
                returnCharClass
            );

            var activeWord = DOMElements.activeWord;
            var characters = activeWord.children;

            //add classes to children
            for (var i = 0; i < characters.length; i++) {
                characters[i].removeAttribute("class");
                characters[i].className = classes[i];
            }
        },

        setActiveWord: function(index) {
            DOMElements.activeWord = DOMElements.content.children[index];
        },

        deactivateCurrentWord: function() {
            DOMElements.activeWord.removeAttribute("class");
        },

        scroll: function() {
            var activeWord = DOMElements.activeWord;
            var top1 = activeWord.offsetTop;
            var top2 = DOMElements.content.offsetTop;
            var diff = top1 - top2;
            DOMElements.content.scrollTop = diff - 36;
        }
    };
})();
