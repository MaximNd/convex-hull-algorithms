import Konva from 'konva';

export default class Canvas {
    constructor(fn) {
        this.points = [];
        this.event = document.createEvent('MouseEvents');
        this.line = undefined;
        this.stage = new Konva.Stage({
            container: 'container',
            height: window.innerHeight,
            width: window.innerWidth,
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.event.initEvent('canvasClicked', true, true);
        document.addEventListener('canvasClicked', fn.bind(this), false);
        this.stage.on('click', () => {
            const mousePos = this.stage.getPointerPosition();
            const x = mousePos.x;
            const y = mousePos.y;

            const point = new Konva.Circle({
                fill: 'black',
                radius: 10,
                x,
                y,
            });

            this.layer.add(point);
            this.layer.draw();
            this.points.push({x, y});
            document.dispatchEvent(this.event);
        });
    }

     drawLinesByPoints(points) {
        if (typeof this.line !== 'undefined') this.line.destroy();
        this.line = new Konva.Line({
            lineCap: 'round',
            lineJoin: 'round',
            points,
            stroke: 'red',
            strokeWidth: 4,
        });
        this.layer.add(this.line);
        this.layer.draw();
    }
}
