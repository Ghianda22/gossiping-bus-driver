import { v4 as uuidv4 } from 'uuid';

const MINUTES_OF_WORK_PER_DAY: number = 480;

export default class BusDriver {
    #_id: string = uuidv4();
    #_route: number[] = [];
    #_dayRoute: number[] = [];
    #_gossipNet: Set<string> = new Set([this.id]);


    constructor(route: number[]) {
        this.#_route = route;
        // initialize dayRoute
        for (let i = 0; i < MINUTES_OF_WORK_PER_DAY; i++) {
            this.#_dayRoute.push(route[i%route.length]);
        }
    }


    get gossipNet(): Set<string> {
        return this.#_gossipNet;
    }

    get id(): string {
        return this.#_id;
    }

    get dayRoute(): number[] {
        return this.#_dayRoute;
    }


    gossipWith(busDriver1: BusDriver): number {
        for (let stop = 0; stop < MINUTES_OF_WORK_PER_DAY; stop++) {
            if(busDriver1.dayRoute[stop] == this.dayRoute[stop]){
                busDriver1.gossipNet.forEach(busDriverId => this.gossipNet.add(busDriverId));
                this.gossipNet.forEach(busDriverId => busDriver1.gossipNet.add(busDriverId));
                return stop + 1;
            }
        }
    }
}