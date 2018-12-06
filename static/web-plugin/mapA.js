const WALL = 0;
const VOID = 1;
const PAD = 2;
const BALL = 3;
const BRCK = 4;
const BRICK = BRCK;

const WIDTH = 12;
const HEIGHT = 17;

const CLEAR = 2;
const DIRTY = 1;


var INITIAL_MAP = [
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
];

var world = {
	map: [],
	dirtyMap: [],
	shapes: [],
	pad: {
		width: 3,
		height: 1,
		mapView: [[PAD], [PAD], [PAD]],
		clearView: [[VOID], [VOID], [VOID]],
		currentPos: {x: 0, y: 0},
		init: function (x, y) {
			if (world.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)){
				this.setCurPos(x, y);
			}
		},
		move: function(deltaX, deltaY){

			if (world.canSetObjectView(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY, this.mapView, this.width, this.height, world.map)) {
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.dirtyMap);
				this.setCurPos(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				return true;
			}
			return false;
		},
		getCurPos: function(){
			return this.currentPos;
		},
		setCurPos: function(x, y){
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	},
	ball: [[BALL]]
}

world.canSetObjectView = function(x, y, objectView, width, height, mapView){
	if (x < 0 || (x + width) >= WIDTH || y < 0 || (y + height) >= HEIGHT){
		return false;
	}
	for (var i = x; i < x + width; i++){
		for (var j = y; j < y + height; j++){
			if (mapView[i][j] != VOID && mapView[i][j] != objectView[i - x][j - y]){
				return false;
			}
		}
	}
	return true;
}

world.fillView = function(x, y, objectView, width, height, mapView){
	if (x < 0 || x >= WIDTH - width || y < 0 || y >= HEIGHT - height){
		return false;
	}
	for (var i = x; i < x + width; i++){
		for (var j = y; j < y + height; j++) {
			mapView[i][j] = objectView[i - x][j - y];
		}
	}
	return true;
}

const HIDDEN_WIDGET = {
	style: {
		backgroundOpacity: 0.0
	}
}

const VISIBLE_WIDGET = {
	style: {
		backgroundOpacity: 1.0
	}
}

var styles = [];
styles[WALL] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: FRAME_COLOR,
		textColor: FRAME_COLOR
	}
};
styles[VOID] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: VOID_COLOR,
		textColor: VOID_COLOR
	}
}
styles[BRICK] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: BRICK,
		textColor: BLOCK_COLOR
	}
}
styles[PAD] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: PAD_COLOR,
		textColor: PAD_COLOR
	}
}

function deepMerge(a, b){
	a.style.backgroundOpacity = b.style.backgroundOpacity;
	return a;
}


var renderer = {

	init: async function () {
		world.pad.init(4, 15);
		// create
		var objects = [];
		var shapePromises = [];

		for (var i = 0; i < WIDTH; i++) {
			shapePromises[i] = []
			for (var j = 0; j < HEIGHT; j++) {
				var value = world.map[i][j];
				var createdObj = Object.assign(
					{}, styles[value], {
						x: BLOCK_STEP * i,
						y: BLOCK_STEP * j
					}
				);
				shapePromises[i][j] = rtb.board.widgets.shapes.create(deepMerge(createdObj, HIDDEN_WIDGET));
				deepMerge(createdObj, VISIBLE_WIDGET);
			}
		}
		for (var i = 0; i < WIDTH; i++) {
			world.shapes[i] = [];
			for (var j = 0; j < HEIGHT; j++) {
				var shape = await shapePromises[i][j];
				var value = world.map[i][j];
				world.shapes[i][j] = shape.id;
				if (objects[value] == null) {
					objects[value] = [];
				}
				objects[value].push(shape.id);
			}
		}
		// batch update
		var promeses = [];
		for (var i = 0; i < objects.length; i++) {
			if (objects[i]) {
				promeses.push(rtb.board.widgets.shapes.update(objects[i], VISIBLE_WIDGET));
			}
		}
		for (var i = 0; i < promeses.length; i++) {
			await promeses[i];
		}
	},

	redrawMap: async function () {
		console.log('redrawMap');
		var objects = [];
		for (var i = 0; i < WIDTH; i++) {
			for (var j = 0; j < HEIGHT; j++) {
				if (world.dirtyMap[i][j] !== world.map[i][j]){
					var value = world.dirtyMap[i][j];
					world.map[i][j] = world.dirtyMap[i][j];
					if (objects[value] == null) {
						objects[value] = [];
					}
					objects[value].push(world.shapes[i][j]);
				}
			}
		}
		// batch update
		var promeses = [];
		for (var i = 0; i < objects.length; i++) {
			if (objects[i]) {
				promeses.push(rtb.board.widgets.shapes.update(objects[i], styles[i]));
			}
		}
		for (var i = 0; i < promeses.length; i++) {
			await promeses[i];
		}
	}
}

for (var j = 0; j < WIDTH; j++){
	world.map[j] = [];
	world.dirtyMap[j] = [];
	for (var i = 0; i < HEIGHT; i++){
		world.dirtyMap[j][i] = world.map[j][i] = INITIAL_MAP[i][j];
	}
}