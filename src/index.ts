import { Point } from './Canvas/Point/Point';
import { IConvexHullAlgorithm } from './algorithms/IConvexHullAlgorithm';
import { GrahamScan } from './algorithms/GrahamScan/GrahamScan';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(): void {
    // let points: Point[] = [new Point(0, 3), new Point(1, 1), new Point(2, 2), new Point(4, 4),
    //                   new Point(0, 0), new Point(1, 2), new Point(3, 1), new Point(3, 3)];
    
    let points: Point[] = [];

    for (let i = 0; i < 100000; ++i) {
        let x = getRandomInt(-10000, 10000);
        let y = getRandomInt(-10000, 10000);
        points.push(new Point(x, y));
    }

    let alg: IConvexHullAlgorithm = new GrahamScan(points);
    console.log(alg.findPoints());
}
main();