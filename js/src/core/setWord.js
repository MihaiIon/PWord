/*
 *
 */
PWord.fn.setWord = function( index ){
	this.core.wordIndex = index;
	this.core.currentWord = this.core.wordList[ index ].word;
};