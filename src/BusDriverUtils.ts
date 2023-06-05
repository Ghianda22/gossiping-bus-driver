import BusDriver from "./BusDriver";

export default class BusDriverUtils {
    static createBusDriversFromString(inputString: string):BusDriver[] {
        let newBusDrivers: BusDriver[] = [];
        let stringRoutes: string[] = inputString.split('\n');

        // convert from string to array of numbers
        let numbersRoutes: number[][] = stringRoutes.map(route => {
            let routeStops: string[] = route.split(' ');
            return routeStops.map(stop => parseInt(stop));
        })

        numbersRoutes.forEach(route=> {
            newBusDrivers.push(
                new BusDriver(route)
            )
        })

        return newBusDrivers;
    }

    /**
     *  for each bus driver the stops they are at a precise moment are compared
     *  if they are at the same stop at the same time, the gossips are exchanged
     *  then their gossip net is checked to see if they have all gossips
     * */
    static stopsRequiredForDailyGossip(busDriver: BusDriver[]): number | string{
        const busDriversUpToDate: Set<BusDriver> = new Set();
        const numberOfBusDrivers:  number = busDriver.length;

        for (let stopIndex = 0; stopIndex < 480; stopIndex++) {
            
            for (let a = 0; a < numberOfBusDrivers-1; a++) {
                for (let b = a+1; b < numberOfBusDrivers; b++) {
                    if(busDriver[a].dayRoute[stopIndex] == busDriver[b].dayRoute[stopIndex]){
                        busDriver[a].exchangeGossipWith(busDriver[b]);
                    }
                    if (busDriver[b].gossipNet.size == numberOfBusDrivers) {
                        busDriversUpToDate.add(busDriver[b]);
                    }
                }
                if(busDriver[a].gossipNet.size == numberOfBusDrivers){
                    busDriversUpToDate.add(busDriver[a]);
                }
            }
            if(busDriversUpToDate.size  == busDriver.length){
                return stopIndex+1;
            }
        }

        return "never";
    }
}