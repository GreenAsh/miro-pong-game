const MOVEMENT_RATE = 20;

let inputDisablingTimer = null;
let inputDisabled = false;
function startInputCheckTimer() {
	if (inputDisablingTimer == null) {
		inputDisablingTimer = setTimeout(function () {
			inputDisabled = false;
			clearTimeout(inputDisablingTimer);
			inputDisablingTimer = null;
		}, 1000 / MOVEMENT_RATE);
	}
}

const input = {
	asHost: function () {
		document.onkeyup = async function (e) {
			inputDisabled = false;
			e.preventDefault();
		};
		document.onkeydown = async function (e) {
			e.preventDefault(); // prevent the default action (scroll / move caret)
			if (inputDisabled === true) {
				startInputCheckTimer();
				return;
			}
			inputDisabled = true;
			e = e || window.event;
			switch (e.which) {
				case 37: // left
					if (world.pads[1].move(-1, 0)) {
						//renderer.redrawMap();
					}
					break;
				case 39: // right
					if (world.pads[1].move(1, 0)) {
						//renderer.redrawMap();
					}
					break;
				case 90: // left
					if (world.pads[0].move(-1, 0)) {
						//renderer.redrawMap();
					}
					break;
				case 88: // right
					if (world.pads[0].move(1, 0)) {
						//renderer.redrawMap();
					}
					break;
				default:
					return; // exit this handler for other keys
			}
		}
	},
	asClient: function (app) {
		document.onkeyup = async function (e) {
			inputDisabled = false;
			e.preventDefault();
		};
		document.onkeydown = async function (e) {
			e.preventDefault(); // prevent the default action (scroll / move caret)
			if (inputDisabled === true) {
				startInputCheckTimer();
				return;
			}
			inputDisabled = true;
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
		}
	}
}