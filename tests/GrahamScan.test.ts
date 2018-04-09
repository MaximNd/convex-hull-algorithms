import { IPoint } from '../src/Canvas/Point/IPoint';
import { Point } from '../src/Canvas/Point/Point';
import { GrahamScan } from './../src/algorithms/GrahamScan/GrahamScan';
describe('GrahamScan algorithm tests', () => {
    it('Empty array', () => {
        const alg = new GrahamScan([]);
        expect(alg.findPoints()).toBeUndefined();
    });

    describe('Thee points in array', () => {
        const points = [
            new Point(0, 0),
            new Point(1, 2),
            new Point(3, 4),
        ];
        const alg = new GrahamScan(points);
        const resPoints = alg.findPoints();
        it('Contain points', () => {
            expect(resPoints).toEqual(expect.arrayContaining(points));
        });
        it('Length === 3', () => {
            expect(resPoints.length).toBe(3);
        });
    });

    describe('Four points in array', () => {
        const points = [
            new Point(0, 0),
            new Point(-10, -10),
            new Point(0, 10),
            new Point(10, -10),
        ];
        const alg = new GrahamScan(points);
        const resPoints = alg.findPoints();
        it('Contain points', () => {
            expect(resPoints).toEqual(expect.arrayContaining([
                new Point(-10, -10),
                new Point(0, 10),
                new Point(10, -10),
            ]));
        });
        it('Does not Contain points', () => {
            expect(resPoints).not.toEqual(expect.arrayContaining([
                new Point(0, 0),
            ]));
        });
        it('Length === 3', () => {
            expect(resPoints.length).toBe(3);
        });
    });

    describe('Four points in array', () => {
        const points = [
            new Point(0, 0),
            new Point(-10, -10),
            new Point(0, 10),
            new Point(10, -10),
        ];
        const alg = new GrahamScan(points);
        const resPoints = alg.findPoints();
        it('Contain points', () => {
            expect(resPoints).toEqual(expect.arrayContaining([
                new Point(-10, -10),
                new Point(0, 10),
                new Point(10, -10),
            ]));
        });
        it('Does not Contain points', () => {
            expect(resPoints).not.toEqual(expect.arrayContaining([
                new Point(0, 0),
            ]));
        });
        it('Length === 3', () => {
            expect(resPoints.length).toBe(3);
        });
    });

    describe('A lot of points in array', () => {
        const points = [new Point(0, 3), new Point(1, 1), new Point(2, 2), new Point(4, 4),
                            new Point(0, 0), new Point(1, 2), new Point(3, 1), new Point(3, 3)];
        const alg = new GrahamScan(points);
        const resPoints = alg.findPoints();
        it('Contain points', () => {
            expect(resPoints).toEqual(expect.arrayContaining([
                new Point(0, 0),
                new Point(0, 3),
                new Point(4, 4),
                new Point(3, 1),
            ]));
        });
        it('Does not Contain points', () => {
            expect(resPoints).not.toEqual(expect.arrayContaining([
                new Point(1, 1),
                new Point(1, 2),
                new Point(2, 2),
                new Point(3, 3),
            ]));
        });
        it('Length === 4', () => {
            expect(resPoints.length).toBe(4);
        });
    });
});
