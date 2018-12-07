var input = {
	asHost: function () {
		document.onkeydown = async function (e) {
			e = e || window.event;
			switch (e.which) {
				case 37: // left
					if (world.pads[1].move(-1, 0)) {
						await renderer.redrawMap();
					}
					break;
				case 39: // right
					if (world.pads[1].move(1, 0)) {
						await renderer.redrawMap();
					}
					break;
				case 38: // up
					if (world.pads[3].move(0, -1)) {
						await renderer.redrawMap();
					}
					break;
				case 40: // down
					if (world.pads[3].move(0, 1)) {
						await renderer.redrawMap();
					}
					break;
				case 90: // left
					if (world.pads[0].move(-1, 0)) {
						await renderer.redrawMap();
					}
					break;
				case 88: // right
					if (world.pads[0].move(1, 0)) {
						await renderer.redrawMap();
					}
					break;
				case 81: // up
					if (world.pads[2].move(0, -1)) {
						await renderer.redrawMap();
					}
					break;
				case 65: // down
					if (world.pads[2].move(0, 1)) {
						await renderer.redrawMap();
					}
					break;
				default:
					console.log(e.which);
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		}
	},
	asClient: function (app) {
		document.onkeydown = async function (e) {
			e = e || window.event;
			switch (e.which) {
				case 37: // left
					app.moveLeft();
					break;
				case 39: // right
					app.moveRight();
					break;
				default:
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		}
	}
}