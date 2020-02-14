const CLEAR = 2;
const DIRTY = 1;

const SHAPES = INITIAL_SHAPES != null ? INITIAL_SHAPES : [];

// noinspection DuplicatedCode
const world = {
	initialMap: [],
	map: [],
	dirtyMap: [],
	shapes: SHAPES,
	pads: [{
		width: 7,
		height: 2,
		mapView: [[VOID, PAD], [PAD, PAD], [PAD, VOID], [PAD, VOID], [PAD, VOID], [PAD, PAD], [VOID, PAD]],
		clearView: [[VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID]],
		currentPos: {x: 0, y: 0},
		canSetObjectView: function () {},
		init: function (x, y) {
			this.canSetObjectView = world.canSetObjectView;
			if (this.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)) {
				this.setCurPos(x, y);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
			}
		},
		move: function (deltaX, deltaY) {
			// noinspection DuplicatedCode
			if (this.canSetObjectView(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY, this.mapView, this.width, this.height, world.map)) {
				let clearView = world.getView(this.getCurPos().x, this.getCurPos().y, this.width, this.height, world.initialMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, clearView, this.width, this.height, world.dirtyMap);
				this.setCurPos(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY);
				let backView = world.getView(this.getCurPos().x, this.getCurPos().y, this.width, this.height, world.initialMap);
				let objView = world.mergeView(this.mapView, backView, VOID);
				world.fillView(this.getCurPos().x, this.getCurPos().y, objView, this.width, this.height, world.dirtyMap);
				return true;
			}
			return false;
		},
		getCurPos: function () {
			return this.currentPos;
		},
		setCurPos: function (x, y) {
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	}, {
		width: 7,
		height: 2,
		mapView: [[PAD, VOID], [PAD, PAD], [VOID, PAD], [VOID, PAD], [VOID, PAD], [PAD, PAD], [PAD, VOID]],
		clearView: [[VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID], [VOID, VOID]],
		currentPos: {x: 0, y: 0},
		canSetObjectView: function () {},
		init: function (x, y) {
			this.canSetObjectView = world.canSetObjectView;
			if (this.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)) {
				this.setCurPos(x, y);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
			}
		},
		move: function (deltaX, deltaY) {
			// noinspection DuplicatedCode
			if (this.canSetObjectView(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY, this.mapView, this.width, this.height, world.map)) {
				let clearView = world.getView(this.getCurPos().x, this.getCurPos().y, this.width, this.height, world.initialMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, clearView, this.width, this.height, world.dirtyMap);
				this.setCurPos(this.getCurPos().x + deltaX, this.getCurPos().y + deltaY);
				let objView = world.mergeView(this.mapView, clearView, VOID);
				world.fillView(this.getCurPos().x, this.getCurPos().y, objView, this.width, this.height, world.dirtyMap);
				return true;
			}
			return false;
		},
		getCurPos: function () {
			return this.currentPos;
		},
		setCurPos: function (x, y) {
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	}],
	ball: {
		width: 1,
		height: 1,
		mapView: [[BALL]],
		clearView: [[VOID]],
		currentPos: {x: 0, y: 0},
		canSetObjectView: function () {},
		init: function (x, y) {
			this.canSetObjectView = function (x, y, objectView, width, height, mapView) {
				//let result = world.canSetObjectView(x, y, objectView, width, height, mapView);
				//if (result) {
				if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT) {
					return false;
				}
				for (var i = x; i < x + width; i++) {
					for (var j = y; j < y + height; j++) {
						if (mapView[i][j] !== VOID &&
							mapView[i][j] !== INVISIBLE &&
							objectView[i - x][j - y] !== VOID &&
							mapView[i][j] !== objectView[i - x][j - y]
						) {
							return false;
						}
					}
				}
				return true;
			}
			// noinspection DuplicatedCode
			if (this.canSetObjectView(x, y, this.mapView, this.width, this.height, world.map)) {
				this.setCurPos(x, y);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
			}
		},
		move: function (deltaX, deltaY) {
			// noinspection DuplicatedCode
			const nextX = this.getCurPos().x + deltaX;
			const nextY = this.getCurPos().y + deltaY;
			// block on the left
			if (!this.canSetObjectView(nextX, this.getCurPos().y, this.mapView, this.width, this.height, world.map)){
				return false;
			}
			if (!this.canSetObjectView(this.getCurPos().x, nextY, this.mapView, this.width, this.height, world.map)){
				return false;
			}
			if (this.canSetObjectView(nextX, nextY, this.mapView, this.width, this.height, world.map)) {
				let clearView = world.getView(this.getCurPos().x, this.getCurPos().y, this.width, this.height, world.initialMap);
				world.fillView(this.getCurPos().x, this.getCurPos().y, clearView, this.width, this.height, world.dirtyMap);
				this.setCurPos(nextX, nextY);
				world.fillView(this.getCurPos().x, this.getCurPos().y, this.mapView, this.width, this.height, world.dirtyMap);
				return true;
			}
			return false;
		},
		getCurPos: function () {
			return this.currentPos;
		},
		setCurPos: function (x, y) {
			this.currentPos.x = x;
			this.currentPos.y = y;
		}
	}
}

world.canSetObjectView = function (x, y, objectView, width, height, mapView) {
	if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT) {
		return false;
	}
	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			if (mapView[i][j] !== VOID &&
				objectView[i - x][j - y] !== VOID &&
				mapView[i][j] !== objectView[i - x][j - y]
			) {
				return false;
			}
		}
	}
	return true;
}
world.fillView = function (x, y, objectView, width, height, mapView) {
	if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT) {
		return false;
	}
	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			mapView[i][j] = objectView[i - x][j - y];
		}
	}
	return true;
}
world.mergeView = function (topView, backgroundView, mask) {
	let result = [];
	for (let i = 0; i < topView.length; i++) {
		let row = topView[i];
		result[i] = [];
		for (let j = 0; j < row.length; j++) {
			result[i][j] = topView[i][j] === mask ? backgroundView[i][j] : topView[i][j];
		}
	}
	return result;
}

world.getView = function (x, y, width, height, mapView) {
	if (x < 0 || (x + width) > WIDTH || y < 0 || (y + height) > HEIGHT) {
		return [[]];
	}
	let result = [];
	for (let i = x; i < x + width; i++) {
		result[i - x] = [];
		for (let j = y; j < y + height; j++) {
			result[i - x][j - y] = mapView[i][j];
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

const styles = [];
styles[WALL] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: FRAME_COLOR,
		stickerBackgroundColor: FRAME_COLOR,
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
		stickerBackgroundColor: VOID_COLOR,
		textColor: VOID_COLOR
	}
}
styles[BRICK] = {
	width: BLOCK_SIZE,
	height: BLOCK_SIZE,
	style: {
		borderWidth: 0,
		borderStyle: 'none',
		backgroundColor: BLOCK_COLOR,
		stickerBackgroundColor: BLOCK_COLOR,
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
		stickerBackgroundColor: PAD_COLOR,
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
		stickerBackgroundColor: BALL_COLOR,
		textColor: BALL_COLOR
	}
}

function deepMerge(a, b) {
	a.style.backgroundOpacity = b.style.backgroundOpacity;
	return a;
}

function mapDeepCopy(sourceMap, destMap) {
	for (let i = 0; i < sourceMap.length; i++) {
		const row = sourceMap[i];
		for (let j = 0; j < row.length; j++) {
			destMap[i][j] = sourceMap[i][j];
		}
	}
}

const renderer = {
	init: async function () {
		if (world.shapes.length === 0) {
			let viewport = await miro.board.viewport.getViewport();
			await this.createWidgets(viewport.x + viewport.width, viewport.y + viewport.height);
			//rtb.board.setViewportWithAnimation()
			//await rtb.board.setViewportWithAnimation({x: viewport.x - BLOCK_SIZE, y: viewport.y - BLOCK_SIZE, width: (WIDTH + 1) * BLOCK_SIZE, height: (HEIGHT + 1) * BLOCK_SIZE})
		} else {
			mapDeepCopy(world.initialMap, world.dirtyMap);
		}
		world.ball.init(
			Math.round((WIDTH - world.ball.width) / 2) + 1,
			Math.round((HEIGHT - world.ball.height) / 2) + 1
		);
		world.pads[0].init(
			Math.round((WIDTH - world.pads[0].width) / 2),
			1
		);
		world.pads[1].init(
			Math.round((WIDTH - world.pads[1].width) / 2),
			HEIGHT - world.pads[1].height - 1
		);
		await this.redrawMap(true);
	},
	createWidgets: async function (viewX, viewY) {
		const shapePromises = [];
		const colPromises = [];
		// viewX = viewX != null? viewX : 0;
		// viewY = viewY != null? viewY : 0;
		for (let i = 0; i < WIDTH; i++) {
			shapePromises[i] = []
			const currentBatch = []
			for (let j = 0; j < HEIGHT; j++) {
				//How mach is batch size???
				//ToDo hack
				if (world.map[i][j] === INVISIBLE) {
					shapePromises[i][j] = INVISIBLE;
					continue;
				}
				const value = world.map[i][j];
				const createdObj = Object.assign(
					{}, styles[value], {
						type: 'shape',
						x: BLOCK_STEP * i,
						y: BLOCK_STEP * j,
						capabilities: {
							editable: false
						}
					}
				);
				currentBatch.push(deepMerge(createdObj, HIDDEN_WIDGET));
				deepMerge(createdObj, VISIBLE_WIDGET);
			}

			// const column = [];
			// world.shapes[i] = column;
			// noinspection JSUnresolvedFunction
			colPromises[i] = miro.board.widgets.create(currentBatch);
			await waitMilliseconds(500);
		}
		//var objects = [];
		for (let i = 0; i < WIDTH; i++) {
			world.shapes[i] = [];
			for (let j = 0; j < HEIGHT; j++) {
				if (shapePromises[i][j] === INVISIBLE) {
					world.shapes[i][j] = INVISIBLE;
					continue;
				}
				const shapes = await colPromises[i];
				//var value = world.map[i][j];
				shapes.forEach(shape => world.shapes[i][j++] = shape.id);
				j--;
				// if (objects[value] == null) {
				// 	objects[value] = [];
				// }
				// objects[value].push(shape.id);
			}
		}
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
		const objects = [];
		for (let i = 0; i < WIDTH; i++) {
			for (let j = 0; j < HEIGHT; j++) {
				if (world.dirtyMap[i][j] !== world.map[i][j] || force === true) {
					const value = world.dirtyMap[i][j];
					//ToDo hack
					if (value === INVISIBLE) {
						continue;
					}
					if (world.shapes[i][j] === INVISIBLE) {
						continue;
					}
					world.map[i][j] = world.dirtyMap[i][j];
					if (objects[value] == null) {
						objects[value] = [];
					}
					objects[value].push(world.shapes[i][j]);
				}
			}
		}
		// batch update
		const promises = []
		let batch = [];
		for (let i = 0; i < objects.length; i++) {
			if (objects[i]) {
				for (let j = 0; j < objects[i].length; j++){
					batch.push({
						id: `${objects[i][j]}`,
						...styles[i]
					});
					if (batch.length > 199) {
						// noinspection JSUnresolvedFunction
						promises.push(miro.board.widgets.update(batch));
						batch = [];
					}
				}
			}
		}
		if (batch.length > 0) {
			// noinspection JSUnresolvedFunction
			promises.push(miro.board.widgets.update(batch));
		}
		for (let i = 0; i < promises.length; i++) {
			await promises[i];
		}
	}
}

for (let j = 0; j < WIDTH; j++) {
	world.initialMap[j] = [];
	world.map[j] = [];
	world.dirtyMap[j] = [];
	for (let i = 0; i < HEIGHT; i++) {
		world.initialMap[j][i] = world.dirtyMap[j][i] = world.map[j][i] = INITIAL_MAP[i][j];
	}
	// hack

}