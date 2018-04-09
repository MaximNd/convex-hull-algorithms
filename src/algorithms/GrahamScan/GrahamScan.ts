import { IConvexHullAlgorithm } from './../IConvexHullAlgorithm';
import { IPoint } from '../../Canvas/Point/IPoint';
import { Point } from '../../Canvas/Point/Point';

enum Direction {
    Collinear,
    Clockwise,
    Counterclockwise
}

export class GrahamScan implements IConvexHullAlgorithm {
    
    private points: IPoint[];
    private p0: IPoint;

    constructor(points: IPoint[]) {
        this.points = points;
    }

    findPoints(): IPoint[] {
        const theBottommostIndex: number = this.findIndexOfTheBottommostPoint();
        this.swapPoints(this.points[0], this.points[theBottommostIndex]);
        this.p0 = this.points[0];
        this.sortPoints();
        // If two or more points make same angle with p0,
        // Remove all but the one that is farthest from p0
        // Remember that, in above sorting, our criteria was
        // to keep the farthest point at the end when more than
        // one points have same angle.
        let m: number = 1; // Initialize size of modified array
        for (let i = 1; i < this.points.length; ++i) {
            // Keep removing i while angle of i and i+1 is same
            // with respect to p0
            while (i < this.points.length - 1 && this.orientation(this.p0, this.points[i], this.points[i + 1]) === Direction.Collinear) ++i;
        
            this. points[m] = this.points[i];
            m++;  // Update size of modified array
        }
        
        // If modified array of points has less than 3 points,
        // convex hull is not possible
        if (m < 3) return;
        
        // Create an empty stack and push first three points
        // to it.
        let pointStack: IPoint[] = [];
        pointStack.push(this.points[0]);
        pointStack.push(this.points[1]);
        pointStack.push(this.points[2]);
        // Process remaining n-3 points
        for (let i = 3; i < m; ++i) {
            // Keep removing top while the angle formed by
            // points next-to-top, top, and points[i] makes
            // a non-left turn
            while (this.orientation(this.findNextToTop(pointStack), pointStack[pointStack.length - 1], this.points[i]) !== Direction.Counterclockwise) {
                pointStack.pop();
            }
            pointStack.push(this.points[i]);
        }
        
        // Now stack has the output points, print contents of stack
        return pointStack;
    }

    // Find next to top Point in a stack
    private findNextToTop(pointsStack: IPoint[]): IPoint {
        return pointsStack[pointsStack.length - 2];
    }

    // Swap two Points
    private swapPoints(point1: IPoint, point2: IPoint) {
        const temp: IPoint = point1;
        point1 = point2;
        point2 = temp;
    }

    // Square of distance between point1 and point2
    private sqDist(point1: IPoint, point2: IPoint): number {
        return (point1.getX() - point2.getX())*(point1.getX() - point2.getX()) +
          (point1.getY() - point2.getY())*(point1.getY() - point2.getY());
    }

    // To find orientation of ordered triplet
    // The function returns Direction(enum)
    private orientation(p1: IPoint, p2: IPoint, p3: IPoint): number {
        let val: number = (p2.getY() - p1.getY()) * (p3.getX() - p2.getX()) - (p2.getX() - p1.getX()) * (p3.getY() - p2.getY());
    
        if (val === 0) return Direction.Collinear;
        return (val > 0) ? Direction.Clockwise : Direction.Counterclockwise;
    }

    // Function for comparing two points
    private compare(p1: IPoint, p2: IPoint) {
        const or = this.orientation(this.p0, p1, p2);
        if (or === Direction.Collinear)
            return (this.sqDist(this.p0, p2) >= this.sqDist(this.p0, p1)) ? -1 : 1;
        
        return (or === Direction.Counterclockwise) ? -1 : 1;
    }

    // Function for finding the bottommost point
    private findIndexOfTheBottommostPoint(): number {
        let ymin: number = this.points[0].getY();
        let min: number = 0;
        for (let i = 1; i < this.points.length; ++i) {
            let y = this.points[i].getY();
        
            // Pick the bottom-most or chose the left
            // most point in case of tie
            if ((y < ymin) || (ymin === y && this.points[i].getX() < this.points[min].getX()))
                ymin = this.points[i].getY();
                min = i;
        }
        return min;
    }

    private sortPoints(): void {
        let pointsToSort: IPoint[] = this.points.slice(1);
        pointsToSort.sort(this.compare.bind(this));
        this.points = [this.points[0], ...pointsToSort];
    }

}