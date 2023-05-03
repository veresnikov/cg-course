import {Application} from "./common/webGLUtils/application";
import {View} from "./application/view";

const view = new View()

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const game = new Application(canvas, view)
    game.start()
})
