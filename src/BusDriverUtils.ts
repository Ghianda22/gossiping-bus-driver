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
}