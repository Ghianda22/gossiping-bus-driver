export default class BusDriver {
    #_dayRoute: number[] = [];
    #_route: number[] = [];

    constructor(route: number[]) {
        this.#_route = route;
        // initialize dayRoute
        for (let i = 0; i < 480; i++) {
            this.#_dayRoute.push(route[i%route.length]);
        }
    }

    get dayRoute(): number[] {
        return this.#_dayRoute;
    }

}