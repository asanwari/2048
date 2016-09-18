function Greedy(moveSimulator){
	this.moveSimulator = moveSimulator;
	console.log('greed enabled!!');
}

Greedy.prototype.move = function(state){
	self = this;
	//scores are calculated and the max score gets to move.
	//in case of similar scores, the bias is as follows
	//down, left, right, up
	//eg if down and up have same score, down will be given precedence
	var scoreArray = [];
	scoreArray[0] = {};
	scoreArray[0].score = self.calculateUpMoveScore(state);
	scoreArray[0].action = 'up';
	console.log('upscore is ',scoreArray[0].score);
	scoreArray[1] = {};
	scoreArray[1].score = self.calculateRightMoveScore(state);
	scoreArray[1].action = 'right';
	console.log('rightscore is ', scoreArray[1].score);
	scoreArray[2] = {};
	scoreArray[2].score = self.calculateLeftMoveScore(state);
	scoreArray[2].action = 'left';
	console.log('leftscore is ', scoreArray[2].score);
	scoreArray[3] = {};
	scoreArray[3].score = self.calculateDownMoveScore(state);
	scoreArray[3].action = 'down';
	console.log('downscore is ', scoreArray[3].score);

	//find the max of scoreArray
    var max = scoreArray[0].score;
    var maxIndex = 0;

    for (var i = 1; i < scoreArray.length; i++) {
        if (scoreArray[i].score >= max) {
            maxIndex = i;
            max = scoreArray[i].score;
        }
    }
	//make max move 
	console.log('moving', scoreArray[maxIndex].action);
	this.moveSimulator.makeMove(scoreArray[maxIndex].action);
}

//calculates score on up move
Greedy.prototype.calculateUpMoveScore = function(state){
	var totalScore = 0;
	var board = state.grid.cells;
	var moveFlag = false;
	for (var i = 0; i < board.length; i++) {
		var rowScore = 0;
		var rowMoveFlag = moveFlag;
		for (var j = 0; j < board[i].length; j++) {
			if(board[i][j] != null){
				var nextOffset = 1;
				while(j+nextOffset < board[i].length && board[i][j+nextOffset] == null){
					nextOffset++
				}
				//merge case
				if (j+nextOffset < board[i].length && board[i][j+nextOffset] != null && board[i][j].value == board[i][j+nextOffset].value){
					rowScore += board[i][j].value *2;
					rowMoveFlag = true; //since merge means moved
					j+=nextOffset;
				}
				//move case
				else if (j-1 >= 0 && board[i][j-1] == null){
					rowMoveFlag = true; 
				}
			}
		}
		moveFlag = rowMoveFlag;
		totalScore+= rowScore;
	}

	return moveFlag?totalScore:-1; //-1 means move not possible
}

//calculates score on down move
Greedy.prototype.calculateDownMoveScore = function(state){
	var totalScore = 0;
	var board = state.grid.cells;
	var moveFlag = false;
	for (var i = 0; i < board.length; i++) {
		var rowScore = 0;
		var rowMoveFlag = moveFlag;
		for (var j = board[i].length-1; j >=0; j--) {
			if(board[i][j] !== null){
				var nextOffset = 1;
				while(j-nextOffset >= 0  && board[i][j-nextOffset] == null){
					nextOffset++
				}
				//merge case
				if (j-nextOffset >= 0 && board[i][j-nextOffset] != null && board[i][j].value == board[i][j-nextOffset].value){
					rowScore += board[i][j].value * 2;
					rowMoveFlag = true; //merge means moved
					j-=nextOffset;
				}
				//move case
				else if (j+1 < board[i].length && board[i][j+1] == null){
					rowMoveFlag = true; 
				}
			}
		}
		moveFlag = rowMoveFlag;
		totalScore+= rowScore;
	}

	return moveFlag?totalScore:-1; //-1 means move not possible
}


//calculates score on left move
Greedy.prototype.calculateLeftMoveScore = function(state){
	var totalScore = 0;
	var board = state.grid.cells;
	var moveFlag = false;
	for (var i = 0; i < board.length; i++) {
		var rowScore = 0;
		var rowMoveFlag = moveFlag;
		for (var j = 0; j < board[i].length; j++) {
			if(board[j][i] != null){
				var nextOffset = 1;
				while(j+nextOffset < board[i].length && board[j+nextOffset][i] == null){
					nextOffset++
				}
				//merge case
				if (j+nextOffset < board[i].length && board[j+nextOffset][i] != null && board[j][i].value == board[j+nextOffset][i].value){
					rowScore += board[j][i].value *2;
					rowMoveFlag = true; //merge means moved
					j+=nextOffset;
				}
				//move case
				else if (j-1 >= 0 && board[j-1][i] == null){
					rowMoveFlag = true; 		
				}
			}
		}
		moveFlag = rowMoveFlag;
		totalScore+= rowScore;
	}

	return moveFlag?totalScore:-1; //-1 means move not possible
}


//calculates score on right move
Greedy.prototype.calculateRightMoveScore = function(state){
	var totalScore = 0;
	var board = state.grid.cells;
	var moveFlag = false;
	for (var i = 0; i < board.length; i++) {
		var rowScore = 0;
		var rowMoveFlag = moveFlag;
		for (var j = board[i].length-1; j >=0; j--) {
			if(board[j][i] !== null){
				var nextOffset = 1;
				while(j-nextOffset >= 0 && board[j-nextOffset][i] == null){
					nextOffset++
				}
				//merge case
				if (j-nextOffset >= 0 && board[j-nextOffset][i] != null && board[j][i].value == board[j-nextOffset][i].value){
					rowScore += board[j][i].value * 2;
					rowMoveFlag = true; //merge means moved
					j-=nextOffset;
				}
				//move case
				else if (j+1 < board[i].length && board[j+1][i] == null){
					rowMoveFlag = true;
				}
			}
		}
		moveFlag = rowMoveFlag;
		totalScore+= rowScore;
	}

	return moveFlag?totalScore:-1; //-1 means move not possible
}