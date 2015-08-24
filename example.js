'use strict';

var queue = require( './queue.js' );

queue.push( function ( done ) {

	console.log( 1 );

	queue.push( function ( done ) {

		console.log( '1:1' );
		
		queue.push( function ( done ) {

			console.log( '1:1:1' );

			queue.push( function ( done ) {

				console.log( '1:1:1:1' );
				done();
			} );

			done();
		} );
		
		queue.push( function ( done ) {

			console.log( '1:1:2' );
			done();
		} );
		
		queue.push( function ( done ) {

			console.log( '1:1:3' );
			done();
		} );
		
		done();
	} );
	
	queue.push( function ( done ) {

		console.log( '1:2' );

		queue.push( function ( done ) {

			console.log( '1:2:1' );
			done();
		} );
		done();
	} );
	
	queue.push( function ( done ) {

		console.log( '1:3' );
		done();
	} );
	
	done();
} );

queue.push( function ( done ) {

	console.log( 2 );
	
	queue.push( function ( done ) {

		console.log( '2:1' );
		
		queue.push( function ( done ) {

			console.log( '2:1:1' );
			done();
		} );
		
		queue.push( function ( done ) {

			console.log( '2:1:2' );
			done();
		} );
		
		queue.push( function ( done ) {

			console.log( '2:1:3' );
			done();
		} );
		
		done();
	} );
	
	queue.push( function ( done ) {

		console.log( '2:2' );
		done();
	} );
	
	queue.push( function ( done ) {

		console.log( '2:3' );
		done();
	} );
	
	done();
} );

queue.push( 'test', function ( done ) {

	console.log( 'test' );
	done();
} );

queue.push( function ( done ) {

	console.log( 3 );

	queue.push( function ( done ) {

		console.log( '3:1' );
		
		queue.push( function ( done ) {

			console.log( '3:1:1' );
			done();
		} );
		
		queue.push( function ( done ) {

			console.log( '3:1:2' );
			done();
		} );
		
		queue.push( function ( done ) {

			console.log( '3:1:3' );
			done();
		} );
		
		done();
	} );
	
	queue.push( function ( done ) {

		console.log( '3:2' );
		done();
	} );
	
	queue.push( function ( done ) {

		console.log( '3:3' );
		done();
	} );
	done();
} );


queue.push( function ( done ) {

	setTimeout( function () {

		console.log( 'LAST' );
	}, 2000 );
} );
