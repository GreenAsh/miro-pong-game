async function setUp() {
    const promises = []

    let data
    for (let x = 0; x < gridInit[0].length; x++) {
        for (let y = 0; y < gridInit.length; y++) {
            if (promises[y] == undefined) {
                promises[y] = []
            }
            switch (gridInit[y][x]) {
                case 0:
                    data = blockDraft
                    break
            }
            promises[y][x] = rtb.board.widgets.shapes.create(Object.assign({},
                data,
                {
                    x: BLOCK_STEP * x,
                    y: BLOCK_STEP * y
                }
            ))
        }
    }

    for (let x = 0; x < promises[0].length; x++) {
        for (let y = 0; y < promises.length; y++) {
            if (brickWidgets[y] == undefined) {
                brickWidgets[y] = []
            }
            brickWidgets[y][x] = await promises[y][x]
        }
    }

    spawnPad()
    spawnBall()
    spawnFrames()
}

async function spawnPad() {
    currentPlayer.widget = await rtb.board.widgets.shapes.create(Object.assign({},
        padDraft,
        {
            x: BLOCK_STEP * Math.floor(gridInit[0].length / 2),
            y: BLOCK_STEP * 14
        }
    ))
}

async function spawnBall() {
    ball.widget = await rtb.board.widgets.shapes.create(Object.assign({},
        ballDraft,
        {
            x: BLOCK_STEP * Math.floor(gridInit[0].length / 2),
            y: BLOCK_STEP * 13
        }
    ))
}

async function spawnFrames() {
    upFrameWidget = await rtb.board.widgets.shapes.create(Object.assign({},
        horizontalFrame,
        {
            x: BLOCK_STEP * gridInit[0].length / 2 - BLOCK_STEP / 2,
            y: - BLOCK_STEP
        }
    ))
    downFrameWidget = await rtb.board.widgets.shapes.create(Object.assign({},
        horizontalFrame,
        {
            x: BLOCK_STEP * gridInit[0].length / 2 - BLOCK_STEP / 2,
            y: BLOCK_STEP * 15
        }
    ))
    leftFrameWidget = await rtb.board.widgets.shapes.create(Object.assign({},
        verticalFrame,
        {
            x: - BLOCK_STEP,
            y: BLOCK_STEP * 7
        }
    ))
    rightFrameWidget = await rtb.board.widgets.shapes.create(Object.assign({},
        verticalFrame,
        {
            x: BLOCK_STEP * gridInit[0].length,
            y: BLOCK_STEP * 7
        }
    ))
}