import { GrahamScan } from './algorithms/GrahamScan/GrahamScan';
import { IConvexHullAlgorithm } from './algorithms/IConvexHullAlgorithm';
import { Point } from './Canvas/Point/Point';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(): void {
    // let points: Point[] = [new Point(0, 3), new Point(1, 1), new Point(2, 2), new Point(4, 4),
    //                   new Point(0, 0), new Point(1, 2), new Point(3, 1), new Point(3, 3)];
    const points: Point[] = [];

    for (let i = 0; i < 100000; ++i) {
        const x = getRandomInt(-10000, 10000);
        const y = getRandomInt(-10000, 10000);
        points.push(new Point(x, y));
    }

    const alg: IConvexHullAlgorithm = new GrahamScan(points);
    // tslint:disable-next-line
    console.log(alg.findPoints());
}
main();
