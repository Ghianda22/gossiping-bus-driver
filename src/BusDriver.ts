import { v4 as uuidv4 } from 'uuid';

const MINUTES_OF_WORK_PER_DAY: number = 480;

export default class BusDriver {
    #_dayRoute: number[] = [];
    #_route: number[] = [];
    #_gossipNet: Set<string> = new Set();
    #_id: string = uuidv4();


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
                busDriver1.gossipNet.add(this.id);
                this.gossipNet.add(busDriver1.id);
                return stop + 1;
            }
        }
    }
}