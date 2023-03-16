/**
 * @typedef {{
 *   x: number,
 *   y: number,
 * }}
 */
let Point

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

        requestAnimationFrame(frame)
    }

    frame()
}

start()