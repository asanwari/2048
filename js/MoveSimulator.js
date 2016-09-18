function MoveSimulator() {
	this.move = [];
	this.move['up'] =  38;
	this.move['right'] = 39;
	this.move['down'] = 40;
	this.move['left'] = 37;
	this.moveCount = 0;
} 

//Make Move
MoveSimulator.prototype.makeMove = function(move) {
  var event = document.createEvent('Event');
  event.keyCode = this.move[move];
  event.which = this.move[move];
  event.initEvent('keydown');
  document.dispatchEvent(event);
  this.moveCount++;
};
