// -- Title : Word.

/*
 *
 */
var Word = function(word){

 /*
  *
  */
 this.value = word;
 
 /*
  *
  */
 this.charList = word.split('');
 
 /*
  *
  */
 this.size = function(){ return this.charList.length; };
 
 
 /*
  *
  */
 this.toString = function(){ return this.value; };
};