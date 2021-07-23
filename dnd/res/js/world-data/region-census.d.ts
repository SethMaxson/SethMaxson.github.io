interface IRegionCensus {
    name: string;
    inhabitants: IRegionInhabitant[];
    subregions?: IRegionCensus[];
}
interface IRegionInhabitant {
    name: string;
    percentage: number;
}
declare const censusData: IRegionCensus[];
