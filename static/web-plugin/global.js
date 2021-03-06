const BLOCK_COLOR = '#ea94bb'
const PAD_COLOR = '#b384bb'
const BALL_COLOR = '#a6ccf5'
const FRAME_COLOR = '#d5f692'
const VOID_COLOR = '#f5f6f8'

// const gridInit = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]

const BLOCK_SIZE = 190
const BLOCK_STEP = 200
// const blockDraft = {
//     width: BLOCK_SIZE,
//     height: BLOCK_SIZE,
//     text: '',
//     style: {
//         borderWidth: 0,
//         backgroundColor: BLOCK_COLOR,
//         textColor: BLOCK_COLOR
//     }
// }
// const padDraft = {
//     width: BLOCK_STEP * 3,
//     height: BLOCK_SIZE,
//     text: '',
//     style: {
//         borderWidth: 0,
//         backgroundColor: PAD_COLOR,
//         textColor: PAD_COLOR
//     }
// }
// const ballDraft = {
//     width: BLOCK_SIZE,
//     height: BLOCK_SIZE,
//     text: '',
//     style: {
//         borderWidth: 0,
//         backgroundColor: BALL_COLOR,
//         textColor: BALL_COLOR
//     }
// }
// const verticalFrame = {
//     width: BLOCK_STEP,
//     height: BLOCK_STEP * 17,
//     text: '',
//     style: {
//         borderWidth: 0,
//         backgroundColor: FRAME_COLOR,
//         textColor: FRAME_COLOR
//     }
// }
// const horizontalFrame = {
//     width: BLOCK_STEP * gridInit[0].length,
//     height: BLOCK_STEP,
//     text: '',
//     style: {
//         borderWidth: 0,
//         backgroundColor: FRAME_COLOR,
//         textColor: FRAME_COLOR
//     }
// }

// let brickWidgets = []
//
// let leftFrameWidget = {}
// let rightFrameWidget = {}
// let upFrameWidget = {}
// let downFrameWidget = {}
//
// let currentPlayer = {
//     movingLeft: false,
//     movingRight: false,
//     widget:{},
//     processMoving: function() {
//
//     }
// }
//
// let ball = {
//     angle: 45,
//     speed: 0,
//     widget:{}
// }
//
function waitMilliseconds(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}