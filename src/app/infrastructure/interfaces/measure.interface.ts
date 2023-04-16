import { IMetric } from "./metric.interface";
import { IUs } from "./us.interface";

export interface IMeasure {
    metric: IMetric;
    us: IUs;
}