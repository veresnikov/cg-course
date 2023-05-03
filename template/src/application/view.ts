import {Painter} from "../common/webGLUtils/painter";
import {ViewInterface} from "../common/webGLUtils/viewInterface";

export class View implements ViewInterface {
    public render(painter: Painter): void {
        painter.clear()
        painter.setColor([0, 0, 0, 1])
        painter.drawTriangle({x: 0, y: 0}, {x: -100, y: 100}, {x: 100, y: 100})
    }
}