const VOID = 0;
const WALL = 1;
const BRCK = 2;
const BRICK = BRCK;
const BALL = 3;
const PAD = 4;

const WIDTH = 12;
const HEIGHT = 17;

let world = {
	map: [
		[WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
		[WALL, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, WALL],
		[WALL, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, WALL],
		[WALL, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, WALL],
		[WALL, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, WALL],
		[WALL, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, BRCK, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, WALL],
		[WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
	],
	pad: {
		width: 3,
		height: 1,
		mapView: [[PAD, PAD, PAD]],
		setPosition: (x, y) => {
			if (x < 0 || x >= WIDTH - this.width || y < 0 || y >= HEIGHT - this.height){
				return;
			}
		}

	},
	ball: [[BALL]],
}