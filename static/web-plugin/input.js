function bindControls(){
	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.which) {
			case 37: // left
				console.log('left');
				rtb.board.transformDelta(ball.widget.id, -BLOCK_STEP, 0);
				break;
			case 38: // up
				console.log('up');
				rtb.board.transformDelta(ball.widget.id, 0, -BLOCK_STEP);
				break;
			case 39: // right
				console.log('right');
				rtb.board.transformDelta(ball.widget.id, BLOCK_STEP, 0);
				break;
			case 40: // down
				console.log('down');
				rtb.board.transformDelta(ball.widget.id, 0, BLOCK_STEP);
				break;
			default:
				return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	}
}

function initModule(){
	bindControls();
}

initModule();


let pad = {
	movingLeft: function(){
	}
};