var getText = wordsModule.words().length;
var randomText = Math.floor(Math.random() * getText);
eventsModule.init(60, randomText);