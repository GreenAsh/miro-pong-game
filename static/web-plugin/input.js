var input = {
	init: function () {
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
				default:
					console.log(e.which);
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		}
	}
}