const CLEAR = 2;
const DIRTY = 1;

var SHAPES = INITIAL_SHAPES != null ? INITIAL_SHAPES : [];

var world = {
	initialMap: [],
	map: [],
	dirtyMap: [],
	shapes: SHAPES,
	pads: [{
		width: 3,
		height: 1,
		mapView: [[PAD], [PAD], [PAD]],
		clearView: [[VOID], [VOID], [VOID]],
		currentPos: {x: 0, y: 0},
		shapesView: PADS_SHAPES[0],
		canSetObjectView: function (){},
		init: function (x, y) {
			this.canSetObjectView = world.canSetObjectView;
			if (this.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)){
				this.setCurPos(x, y);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.shapesView, this.width, this.height, world.shapes);
				this.render();
			}
		},
		move: function(deltaX, deltaY){
			if (this.canSetObjectView(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY, this.mapView, this.width, this.height, world.map)) {
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.shapes);
				this.setCurPos(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.shapesView, this.width, this.height, world.shapes);

				var objects = [];
				for (var i = 0; i < this.width; i++){
					for (var j = 0; j < this.height; j++){
						objects.push(this.shapesView[i][j]);
					}
				}
				rtb.board.transformDelta(objects, BLOCK_STEP * deltaX, BLOCK_STEP * deltaY);
				return true;
			}
			return false;
		},
		render: async function(){
			let objects = [];
			for (var i = 0; i < this.width; i++){
				for (var j = 0; j < this.height; j++){
					objects.push(rtb.board.widgets.shapes.update(this.shapesView[i][j], {
						x: BLOCK_STEP * (this.getCurPos().x + i),
						y: BLOCK_STEP * (this.getCurPos().y + j)
					}));
				}
			}
			for (var i = 0; i < objects.length; i++){
				await objects[i];
			}
		},
		getCurPos: function(){
			return this.currentPos;
		},
		setCurPos: function(x, y){
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	}, {
		width: 3,
		height: 1,
		mapView: [[PAD], [PAD], [PAD]],
		clearView: [[VOID], [VOID], [VOID]],
		currentPos: {x: 0, y: 0},
		shapesView: PADS_SHAPES[1],
		canSetObjectView: function (){},
		init: function (x, y) {
			this.canSetObjectView = world.canSetObjectView;
			if (this.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)){
				this.setCurPos(x, y);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.shapesView, this.width, this.height, world.shapes);
				this.render();
			}
		},
		move: function(deltaX, deltaY){
			if (this.canSetObjectView(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY, this.mapView, this.width, this.height, world.map)) {
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.shapes);
				this.setCurPos(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.shapesView, this.width, this.height, world.shapes);

				var objects = [];
				for (var i = 0; i < this.width; i++){
					for (var j = 0; j < this.height; j++){
						objects.push(this.shapesView[i][j]);
					}
				}
				rtb.board.transformDelta(objects, BLOCK_STEP * deltaX, BLOCK_STEP * deltaY);
				return true;
			}
			return false;
		},
		render: async function(){
			let objects = [];
			for (var i = 0; i < this.width; i++){
				for (var j = 0; j < this.height; j++){
					objects.push(rtb.board.widgets.shapes.update(this.shapesView[i][j], {
						x: BLOCK_STEP * (this.getCurPos().x + i),
						y: BLOCK_STEP * (this.getCurPos().y + j)
					}));
				}
			}
			for (var i = 0; i < objects.length; i++){
				await objects[i];
			}
		},
		getCurPos: function(){
			return this.currentPos;
		},
		setCurPos: function(x, y){
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	}],
	ball: {
		width: 1,
		height: 1,
		mapView: [[BALL]],
		clearView: [[VOID]],
		currentPos: {x:0,y:0},
		shapesView: BALL_SHAPES,
		canSetObjectView: function(){},
		init: function(x, y){
			this.canSetObjectView = world.canSetObjectView;
			if (this.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)){
				this.setCurPos(x, y);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.shapesView, this.width, this.height, world.shapes);
				this.render();
			}
		},
		move: function(deltaX, deltaY){
			if (this.canSetObjectView(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY, this.mapView, this.width, this.height, world.map)) {
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.clearView, this.width, this.height, world.shapes);
				this.setCurPos(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.shapesView, this.width, this.height, world.shapes);

				var objects = [];
				for (var i = 0; i < this.width; i++){
					for (var j = 0; j < this.height; j++){
						objects.push(this.shapesView[i][j]);
					}
				}
				rtb.board.transformDelta(objects, BLOCK_STEP * deltaX, BLOCK_STEP * deltaY);
				return true;
			}
			return false;
		},
		render: async function(){
			let objects = [];
			for (var i = 0; i < this.width; i++){
				for (var j = 0; j < this.height; j++){
					objects.push(rtb.board.widgets.shapes.update(this.shapesView[i][j], {
						x: BLOCK_STEP * (this.getCurPos().x + i),
						y: BLOCK_STEP * (this.getCurPos().y + j)
					}));
				}
			}
			for (var i = 0; i < objects.length; i++){
				await objects[i];
			}
		},
		getCurPos: function(){
			return this.currentPos;
		},
		setCurPos: function(x, y){
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	}
}

world.canSetObjectView = function(x, y, objectView, width, height, mapView){
	if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT){
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
	if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT){
		return false;
	}
	for (var i = x; i < x + width; i++){
		for (var j = y; j < y + height; j++) {
			mapView[i][j] = objectView[i - x][j - y];
		}
	}
	return true;
}
world.getShapesView = function(x, y, width, height, shapesMap){
	if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT){
		return false;
	}
	var result = [];
	for (var i = x; i < x + width; i++){
		result[i-x] = [];
		for (var j = y; j < y + height; j++) {
			result[i-x][j-y] = shapesMap[i][j];
		}
	}
	return result;
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
// styles[VOID] = {
// 	width: BLOCK_SIZE,
// 	height: BLOCK_SIZE,
// 	style: {
// 		borderWidth: 0,
// 		borderStyle: 'none',
// 		backgroundColor: VOID_COLOR,
// 		textColor: VOID_COLOR
// 	}
// }
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
styles[BALL] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: BALL_COLOR,
		textColor: BALL_COLOR
	}
}

function deepMerge(a, b){
	a.style.backgroundOpacity = b.style.backgroundOpacity;
	return a;
}

function mapDeepCopy(sourceMap, destMap){
	for (var i = 0; i < sourceMap.length; i++){
		row = sourceMap[i];
		for (var j = 0; j < row.length; j++){
			destMap[i][j] = sourceMap[i][j];
		}
	}
}

var renderer = {
	init: async function () {
		// if (world.shapes.length === 0){
		// 	var viewport = rtb.board.getViewport();
		// 	await this.createWidgets(viewport.x + viewport.width, viewport.y + viewport.height);
		// 	//await rtb.board.setViewportWithAnimation({x: viewport.x - BLOCK_SIZE, y: viewport.y - BLOCK_SIZE, width: (WIDTH + 1) * BLOCK_SIZE, height: (HEIGHT + 1) * BLOCK_SIZE})
		// } else {
		// 	mapDeepCopy(world.initialMap, world.dirtyMap);
		// }
		mapDeepCopy(world.initialMap, world.dirtyMap);
		world.shapes = [];
		for (var i = 0; i < WIDTH; i++){
			world.shapes[i] = [];
			for (var j = 0; j < HEIGHT; j++){
				world.shapes[i][j] = VOID;
			}
		}
		world.ball.init(5, 16);
		world.pads[0].init(4, 1);
		world.pads[1].init(4, 17);
		await this.redrawMap(true);
	},
	createWidgets: async function(viewX, viewY){
		var shapePromises = [];
		// viewX = viewX != null? viewX : 0;
		// viewY = viewY != null? viewY : 0;
		for (var i = 0; i < WIDTH; i++) {
			shapePromises[i] = []
			for (var j = 0; j < HEIGHT; j++) {
				//ToDo hack
				if (world.map[i][j] === INVISIBLE){
					shapePromises[i][j] = INVISIBLE;
					continue;
				}
				var value = world.map[i][j];
				if (styles[value] == null){
					continue
				}
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
		//var objects = [];
		for (var i = 0; i < WIDTH; i++) {
			world.shapes[i] = [];
			for (var j = 0; j < HEIGHT; j++) {
				if (shapePromises[i][j] === INVISIBLE){
					world.shapes[i][j] = INVISIBLE;
					continue;
				}
				var shape = await shapePromises[i][j];
				//var value = world.map[i][j];
				world.shapes[i][j] = shape.id;
				// if (objects[value] == null) {
				// 	objects[value] = [];
				// }
				// objects[value].push(shape.id);
			}
		}
		//console.log(JSON.stringify(world.shapes));
		// // batch update
		// var promeses = [];
		// for (var i = 0; i < objects.length; i++) {
		// 	if (objects[i]) {
		// 		promeses.push(rtb.board.widgets.shapes.update(objects[i], VISIBLE_WIDGET));
		// 	}
		// }
		// for (var i = 0; i < promeses.length; i++) {
		// 	await promeses[i];
		// }
	},
	redrawMap: async function (force) {
		// var objects = [];
		for (var i = 0; i < WIDTH; i++) {
			for (var j = 0; j < HEIGHT; j++) {
				if (world.dirtyMap[i][j] !== world.map[i][j] || force === true){
					var value = world.dirtyMap[i][j];
					//ToDo hack
					if (value === INVISIBLE){
						continue;
					}
					world.map[i][j] = world.dirtyMap[i][j];
					// if (world.map[i][j] === VOID) {
					// 	continue;
					// }
					// if (objects[value] == null) {
					// 	objects[value] = [];
					// }
					//objects[value].push(world.shapes[i][j]);
				}
			}
		}
		// batch update
		//var promeses = [];
		// for (var i = 0; i < objects.length; i++) {
		// 	if (objects[i]) {
		// 		rtb.board.widgets.shapes.update(objects[i], styles[i]);
		// 	}
		// }
		// for (var i = 0; i < promeses.length; i++) {
		// 	await promeses[i];
		// }
	}
}

for (var j = 0; j < WIDTH; j++){
	world.initialMap[j] = [];
	world.map[j] = [];
	world.dirtyMap[j] = [];
	for (var i = 0; i < HEIGHT; i++){
		world.initialMap[j][i] = world.dirtyMap[j][i] = world.map[j][i] = INITIAL_MAP[i][j];
	}
	// hack

}