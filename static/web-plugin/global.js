const BLOCK_COLOR = '#000000'
const PAD_COLOR = '#A32F2F'
const BALL_COLOR = '#05668D'

const gridInit = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const BLOCK_SIZE = 190
const BLOCK_STEP = 200
const blockDraft = {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    text: '',
    style: {
        borderWidth: 0,
        backgroundColor: BLOCK_COLOR,
        textColor: BLOCK_COLOR
    }
}
const padDraft = {
    width: BLOCK_STEP * 3,
    height: BLOCK_SIZE,
    text: '',
    style: {
        borderWidth: 0,
        backgroundColor: PAD_COLOR,
        textColor: PAD_COLOR
    }
}
const ballDraft = {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    text: '',
    style: {
        borderWidth: 0,
        backgroundColor: BALL_COLOR,
        textColor: BALL_COLOR
    }
}

let brickWidgets = []

let currentPlayer = {
    movingLeft: false,
    movingRight: false,
    widget:{}
}

let ball = {
    angle: 45,
    speed: 0,
    widget:{}
}