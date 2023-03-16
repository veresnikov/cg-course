/**
 * @typedef {{
 *   x: number,
 *   y: number,
 * }}
 */
let Point

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Point} point
 * @param {number} scale
 */
const renderBLetter = (context, point, scale) => {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'

    context.beginPath()
    let x = point.x
    let y = point.y
    context.rect(x, y, 7 * scale, 100 * scale)
    context.rect(x, y, 27 * scale, 2 * scale)
    y = y + 98 * scale
    context.rect(x, y, 27 * scale, 2 * scale)
    x = x + 20 * scale
    context.rect(x, y, 7 * scale, -50 * scale)
    x = point.x + 20 * scale
    y = point.y
    context.rect(x, y, 7 * scale, 30 * scale)
    context.closePath()
    context.fill()
    context.stroke()
    context.beginPath()
    x = x + 7 * scale
    y = y + 30 * scale
    context.moveTo(x, y)
    x = x - 7 * scale
    context.lineTo(x, y)
    x = x - 13 * scale
    y = y + 10 * scale
    context.lineTo(x, y)
    context.moveTo(x, y)
    x = x + 13 * scale
    y = y + 8 * scale
    context.lineTo(x, y)
    x = x + 7 * scale
    context.lineTo(x, y)
    context.closePath()
    context.fill()
    context.stroke()
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Point} point
 * @param {number} scale
 */
const renderKLetter = (context, point, scale) => {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'

    context.beginPath()
    let x = point.x
    let y = point.y
    context.rect(x, y, 7 * scale, 100 * scale)
    y = y + 100 * scale
    x = x + 20 * scale
    context.rect(x, y, 7 * scale, -50 * scale)
    x = point.x + 20 * scale
    y = point.y
    context.rect(x, y, 7 * scale, 30 * scale)
    context.closePath()
    context.fill()
    context.stroke()
    context.beginPath()
    x = x + 7 * scale
    y = y + 30 * scale
    context.moveTo(x, y)
    x = x - 7 * scale
    context.lineTo(x, y)
    x = x - 13 * scale
    y = y + 10 * scale
    context.lineTo(x, y)
    context.moveTo(x, y)
    x = x + 13 * scale
    y = y + 10 * scale
    context.lineTo(x, y)
    x = x + 7 * scale
    context.lineTo(x, y)
    context.closePath()
    context.fill()
    context.stroke()
}

/**
 * @param {CanvasRenderingContext2D} context
 */
const canvasCleanup = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

/**
 * @typedef {{
 *     time: number,
 *     speed: number,
 *     shift: number,
 * }}
 */
let JumpData

const ACCELERATION = 1

/**
 * @param {JumpData} jumpData
 */
const updateJumpData = (jumpData) => {
    jumpData.shift = jumpData.time * (jumpData.speed - ACCELERATION * jumpData.time / 2)
    if (jumpData.shift < 0) {
        jumpData.shift = 0
        jumpData.time = 0
    }
    ++jumpData.time
}

/**
 * @param {Map<function, JumpData>} storage
 * @param {function} renderFunc
 * @param {Point} position
 */
const jump = (storage, renderFunc, position) => {
    let data = storage.get(renderFunc)
    updateJumpData(data)
    renderFunc({
        x: position.x,
        y: position.y - data.shift,
    })
    storage.set(renderFunc, data)
}

const start = () => {
    /**
     * @type {?CanvasRenderingContext2D}
     */
    let context = document.getElementById("canvas").getContext("2d")
    if (context === null) {
        throw new Error("canvas context is null")
    }

    /**
     * @type {Map<function, JumpData>}
     */
    let jumpDataStorage = new Map()

    const first = (point) => {
        renderBLetter(context, point, 3)
    }
    const second = (point) => {
        renderKLetter(context, point, 3)
    }
    const third = (point) => {
        renderBLetter(context, point, 3)
    }

    jumpDataStorage.set(first, {
        time: 0,
        speed: 22,
        shift: 0,
    })
    jumpDataStorage.set(second, {
        time: 0,
        speed: 20,
        shift: 0,
    })
    jumpDataStorage.set(third, {
        time: 0,
        speed: 19,
        shift: 0,
    })

    const frame = () => {
        canvasCleanup(context)
        jump(jumpDataStorage, first, {x: 300, y: 300})
        jump(jumpDataStorage, second, {x: 400, y: 300})
        jump(jumpDataStorage, third, {x:500, y: 300})
        requestAnimationFrame(frame)
    }

    frame()
}

start()