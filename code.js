var getText = wordsModule.words().length;
var randomText = Math.floor(Math.random() * getText);
console.log(randomText);
eventsModule.init(60, randomText);