/*
 *
 */
PWord.fn.Letter = function( char ){
	if (/^[a-z0-9. ]$/.test(char)) {
		this.character = char;
		this.matrix = this.getMatrix( char );
	} else throw new Error("Unsupported character '"+char+"'.");
};

PWord.fn.Letter.prototype.getMatrix = function( char ){
	switch(char){
		case ' ': return [ 0, 0, 0, 0, 0, 
						   0, 0, 0, 0, 0,
						   0, 0, 0, 0, 0,
						   0, 0, 0, 0, 0,
						   0, 0, 0, 0, 0  ];

 		case '.': return [ 0, 0, 0, 0, 0, 
						   0, 0, 0, 0, 0,
						   0, 0, 0, 0, 0,
						   0, 1, 1, 0, 0,
						   0, 1, 1, 0, 0  ];
 
 		case 'a': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1  ];

		case 'b': return [ 1, 1, 1, 1, 0, 
						   1, 0, 0, 1, 0,
						   1, 1, 1, 1, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];

		case 'c': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 0,
						   1, 0, 0, 0, 0,
						   1, 0, 0, 0, 0,
						   1, 1, 1, 1, 1  ];

		case 'd': return [ 1, 1, 1, 1, 0, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 0  ];

		case 'e': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 0,
						   1, 1, 1, 0, 0, 
						   1, 0, 0, 0, 0,
						   1, 1, 1, 1, 1  ];

		case 'f': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 0,
						   1, 1, 1, 0, 0, 
						   1, 0, 0, 0, 0,
						   1, 0, 0, 0, 0  ];

		case 'g': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 0,
						   1, 0, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];

		case 'h': return [ 1, 0, 0, 0, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1  ];				   

	   	case 'i': return [ 0, 0, 1, 0, 0, 
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0, 
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0  ];

		case 'j': return [ 0, 0, 0, 0, 1, 
						   0, 0, 0, 0, 1,
						   0, 0, 0, 0, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];

		case 'k': return [ 1, 0, 0, 1, 0, 
						   1, 0, 0, 1, 0,
						   1, 0, 0, 1, 0, 
						   1, 1, 1, 1, 0,
						   1, 0, 0, 0, 1  ];

		case 'l': return [ 1, 0, 0, 0, 0, 
						   1, 0, 0, 0, 0,
						   1, 0, 0, 0, 0, 
						   1, 0, 0, 0, 0,
						   1, 1, 1, 1, 1  ];

		case 'm': return [ 1, 1, 1, 1, 1, 
						   1, 0, 1, 0, 1,
						   1, 0, 1, 0, 1, 
						   1, 0, 1, 0, 1,
						   1, 0, 1, 0, 1  ];

		case 'n': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1  ];

		case '0':
		case 'o': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];

		case 'p': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   1, 0, 0, 0, 0,
						   1, 0, 0, 0, 0  ];

		case 'q': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 1, 0, 1,
						   1, 1, 1, 1, 1  ];

	   	case 'r': return [ 1, 1, 1, 1, 0,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 0, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1 ];

		case '5':
		case 's': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 0,
						   1, 1, 1, 1, 1,
						   0, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];
	   	
	   	case 't': return [ 1, 1, 1, 1, 1,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0  ];

		case 'u': return [ 1, 0, 0, 0, 1, 
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];
	   	
	   	case 'v': return [ 1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   0, 1, 0, 1, 0,
						   0, 1, 0, 1, 0,
						   0, 0, 1, 0, 0 ];

		case 'w': return [ 1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 0, 1, 0, 1,
						   1, 0, 1, 0, 1,
						   1, 1, 1, 1, 1 ];

		case 'x': return [ 1, 1, 0, 1, 1,
						   0, 1, 1, 1, 0,
						   0, 0, 1, 0, 0,
						   0, 1, 1, 1, 0,
						   1, 1, 0, 1, 1 ];

		case 'y': return [ 1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0 ];

		case '2':
		case 'z': return [ 1, 1, 1, 1, 1,
						   0, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   1, 0, 0, 0, 0,
						   1, 1, 1, 1, 1 ];

		case '1': return [ 0, 1, 1, 0, 0,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0,
						   0, 0, 1, 0, 0 ];

		case '3': return [ 1, 1, 1, 1, 1,
						   0, 0, 0, 0, 1,
						   0, 0, 1, 1, 1,
						   0, 0, 0, 0, 1,
						   1, 1, 1, 1, 1 ];

		case '4': return [ 1, 0, 0, 0, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   0, 0, 0, 0, 1,
						   0, 0, 0, 0, 1 ];

		case '6': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 0,
						   1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];

		case '7': return [ 1, 1, 1, 1, 1, 
						   0, 0, 0, 0, 1,
						   0, 0, 0, 0, 1,
						   0, 0, 0, 0, 1,
						   0, 0, 0, 0, 1  ];

		case '8': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];

		case '9': return [ 1, 1, 1, 1, 1, 
						   1, 0, 0, 0, 1,
						   1, 1, 1, 1, 1,
						   0, 0, 0, 0, 1,
						   1, 1, 1, 1, 1  ];
 	}
};