function AI(){
	console.log('AIfied!!');
	this.moveSimulator = new MoveSimulator();
	this.algorithmList = [];
	this.algorithmList['greedy'] = new Greedy(this.moveSimulator);
	this.currentAlgorithm = 'greedy';
}

AI.prototype.makeAIMove = function(storageManager, inputManager) {
	var self = this;
   	var stopGame = false;
	
	function loop() {
		//game stops when no more possible moves
		stopGame = storageManager.getGameState()? storageManager.getGameState().over:true;
	    if (!stopGame) {
	    	self.algorithmList[self.currentAlgorithm].move(storageManager.getGameState());
		    setTimeout( loop, 100 );
	    }
	    else{
	      	  console.log(self.moveSimulator.moveCount);
	    }
	}
	loop();

};


//set the AI Algorithm
AI.prototype.setCurrentAlgorithm = function(newAlgorithm){
	this.currentAlgorithm = newAlgorithm;
}
//get current algorithm
AI.prototype.getCurrentAlgorithm = function(){
	return this.currentAlgorithm;
}