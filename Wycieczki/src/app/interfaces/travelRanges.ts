export interface ITravelRanges {
    countries: Set<string>;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    maxPrice: number;
    ratings: Set<number>;
}
