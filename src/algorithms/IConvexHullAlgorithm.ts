import { IPoint } from './../Canvas/Point/IPoint';

export interface IConvexHullAlgorithm {
    findPoints(): IPoint[];
}
