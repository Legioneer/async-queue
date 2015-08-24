# async-queue
This is a queuing system designed for node.js that allows you to push to a global queue and push to it within a nested structure.

When pushing to a queue you have two options. You can push to the global queue or you can push to a specific queue. IE:

queue.push( 'my own custom queue', function () {} );

queue.push( function () {} ); 
