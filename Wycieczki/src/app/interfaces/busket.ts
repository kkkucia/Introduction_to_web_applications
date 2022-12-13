import { ITravel } from "./travel";

export interface IBusket {
    allCost: number;
    chosenTravels: Map<ITravel, number>;
    travelCounter: number;
    currency: number;
}
