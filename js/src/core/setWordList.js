/*
 *
 */
PWord.fn.setWordList = function( list ){
	var c = this.core.wordList = [];
 	for (var i = 0; i < list.length; i++) {
 		c.push( new PWord.fn.Word( list[i].word, list[i].color ) );
 	}
 	this.setWord(0); // Set the displayed word.
};