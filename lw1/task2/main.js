/**
 * @typedef {{
 *   x: number,
 *   y: number,
 * }}
 */
let Point

/**
 * @param {CanvasRenderingContext2D} context
 * @param {function} f
 */
const drawPath = (context, f) => {
    context.beginPath()
    f(context)
    context.closePath()
    context.fill()
    context.stroke()
}

const wheelImpl = (context, point) => {
    drawPath(context, (context) => {
        context.fillStyle = 'black'
        context.arc(point.x, point.y, 20, 0, Math.PI * 2)
    })
    drawPath(context, (context) => {
        context.fillStyle = 'white'
        context.arc(point.x, point.y, 15, 0, Math.PI * 2)
    })
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Point} point
 */
const render = (context, point) => {
    drawPath(context, (context) => {
        context.fillStyle = 'gray'
        context.rect(point.x, point.y, 300, 100)
        context.rect(point.x + 150, point.y - 10, 45, 10)
    })

    drawPath(context, (context) => {
        context.strokeStyle = 'black'
        context.moveTo(point.x + 190, point.y - 10)
        context.lineTo(point.x + 10, point.y - 40)
    })
    drawPath(context, (context) => {
        context.strokeStyle = 'black'
        context.moveTo(point.x + 165, point.y - 10)
        context.lineTo(point.x + 10, point.y - 20)
    })

    drawPath(context, (context) => {
        context.fillStyle = 'blue'
        context.rect(point.x + 10, point.y + 10, 30, 50)
        context.rect(point.x + 50, point.y + 10, 30, 50)
        context.rect(point.x + 90, point.y + 10, 30, 50)
        context.rect(point.x + 130, point.y + 10, 30, 50)
        context.rect(point.x + 170, point.y + 10, 30, 50)
        context.rect(point.x + 210, point.y + 10, 30, 50)
        context.rect(point.x + 260, point.y, 40, 60)
    })
    wheelImpl(context, {
        x: point.x + 40,
        y: point.y + 100,
    })
    wheelImpl(context, {
        x: point.x + 80,
        y: point.y + 100,
    })
    wheelImpl(context, {
        x: point.x + 250,
        y: point.y + 100,
    })
}

/**
 * @param {CanvasRenderingContext2D} context
 */
const canvasCleanup = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const start = () => {
    /**
     * @type {?CanvasRenderingContext2D}
     */
    let context = document.getElementById("canvas").getContext("2d")
    if (context === null) {
        throw new Error("canvas context is null")
    }

    const frame = () => {
        canvasCleanup(context)
        render(context, {x: 500, y: 500})
        requestAnimationFrame(frame)
    }

    frame()
}

start()