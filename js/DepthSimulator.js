function DepthSimulator(gameManager){


this.gameManager = gameManager;
}
/*
HM.prototype.Score = function(gc){
	return 1;
}
*/


var stack = [];
DepthSimulator.prototype.getSimulatedBoards = function(depth){
	
	if (stack.length ===0 && stack.length != Math.pow(4,depth)){
		var moves = this.enumerateMoves(depth, '');
	}
	var originalStorageManagerClone = this.cloneGame(this.gameManager.storageManager);
	for (var i = 0; i < stack.length; i++) {
		var actuatorClone = this.cloneGame(this.gameManager.actuator);
		var storageManagerClone = this.cloneGame(this.gameManager.storageManager);
		var gc =  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
		gc.setup(storageManagerClone.getGameState());
		for (var j = 0; j < stack[i].length; j++) {
			gc.move(stack[i][j]);
			print2DArray(gc.storageManager.getGameState());

		}
	}

	alert('function ends');
	this.gameManager.setup(originalStorageManagerClone.getGameState());
	console.log(originalStorageManagerClone.getGameState());

}

DepthSimulator.prototype.enumerateMoves = function(depth, currentString){
	var str = currentString;
	if (depth <= 0){
		stack.push(currentString);
	}
	else{
		this.enumerateMoves(depth-1, str+'0');
		this.enumerateMoves(depth-1, str+'1');
		this.enumerateMoves(depth-1, str+'2');
		this.enumerateMoves(depth-1, str+'3');
	}
}

DepthSimulator.prototype.cloneGame = function(obj){
 if (null == obj || "object" != typeof(obj))
 {
 	console.log("Same Return");
 	return obj;
 } 

 	console.log(typeof(obj), 'is the type')
    var copy = obj.constructor();
    console.log(copy);
    for (var attr in obj) {
    	console.log(attr);
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }


    console.log("New return");
    return copy;

}

function print2DArray(stateObj){
	var board = stateObj.grid.cells;
	for(var i = 0; i < 4; i++){


		console.log(board[i][0], board[i][1], board[i][2], board[i][3]);
/*		console.log(board[i][1]);
		console.log(board[i][2]);
		console.log(board[i][3]);*/
	}
	console.log('-------------')
};