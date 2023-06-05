import { v4 as uuidv4 } from 'uuid';
import Gossip from "./Gossip";

const MINUTES_OF_WORK_PER_DAY: number = 480;

export default class BusDriver {
    #_id: string = uuidv4();
    #_route: number[] = [];
    #_dayRoute: number[] = [];
    #_gossipNet: Set<string> = new Set();


    constructor(route: number[]) {+
        this.gossipNet.add(new Gossip(this.#_id).id);
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
                busDriver1.gossipNet.forEach(gossipId => this.gossipNet.add(gossipId));
                this.gossipNet.forEach(gossipId => busDriver1.gossipNet.add(gossipId));
                return stop + 1;
            }
        }
    }
}