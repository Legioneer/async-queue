'use strict';

var lastId    = 0;
var queues    = {};
var executing = {};

function id () {

	lastId++;
	return lastId;
}

function queuePush () {

	var callBack;
	var target;
	var queue = 'global';

	if ( arguments[ 0 ] !== undefined && ( arguments.length === 2 || arguments.length === 3 ) ) {
		queue    = 'personal_' + arguments[ 0 ];
		callBack = arguments[ 1 ];

	} else {
		callBack = arguments[ 0 ];
	}

	if ( arguments[ 2 ] ) {
		target = arguments[ 2 ];

	} else {

		if ( !queues[ queue ] ) {
			queues[ queue ] = [];
		}

		target = queues[ queue ];
	}

	if ( executing[ queue ] && target[ 0 ] ) {

		if ( executing[ queue ] === target[ 0 ].id ) {
			target[ 0 ].queue.push( {
				'callBack' : callBack,
				'id'       : id(),
				'queue'    : []
			} );

		} else {
			queuePush( queue, callBack, target[ 0 ].queue );
		}

	} else {
		queues[ queue ].push( {
			'callBack' : callBack,
			'id'       : id(),
			'queue'    : []
		} );
	}

	// Execute queue if it has not started.
	if ( !executing[ queue ] ) {
		setTimeout( function () {

			executeNextTask( queue );
		}, 0 );
	}
}

function queueStop () {

	var queue = 'global';

	if ( arguments[ 0 ] !== undefined ) {
		queue = 'personal_' + arguments[ 0 ];
	}

	executing[ queue ] = false;
	queues[ queue ]    = [];
}

function executeNextTask () {

	var target;
	var queue = 'global';

	if ( arguments[ 0 ] !== undefined ) {
		queue = 'personal_' + arguments[ 0 ];
	}

	if ( arguments[ 1 ] !== undefined ) {
		target = arguments[ 1 ];

	} else {
		target = queues[ queue ];
	}

	if ( target[ 0 ] ) {

		// If the first object has a callBack execute it.
		if ( target[ 0 ].callBack ) {
			var callBack       = target[ 0 ].callBack;
			executing[ queue ] = target[ 0 ].id;
			delete target[ 0 ].callBack;
			callBack( executeNextTask );

		// If the first object has a queue and something in it iterate to it.
		} else if ( target[ 0 ].queue && target[ 0 ].queue[ 0 ] ) {
			executeNextTask( queue, target[ 0 ].queue );

		// If the first object has a queue and has nothing in it, remove it.
		} else if ( target[ 0 ].queue && target[ 0 ].queue[ 0 ] === undefined ) {
			target.splice( 0, 1 );
			executeNextTask( queue );
		}
	}
}

module.exports = {
	'push' : queuePush
};
