import BusDriver from "../src/BusDriver";
import BusDriverUtils from "../src/BusDriverUtils";

function getFirstGossipOf (busDriver: BusDriver): string {
    return busDriver.gossipNet.values().next().value;
}

test('Given a route, the total day of work should be that route repeated to reach 480 minutes of driving', () => {
    //given
    let busDriver: BusDriver = new BusDriver([3,1,2,3]);

    //when

    //then
    expect(busDriver.dayRoute.length).toEqual(480);
})

test('Given two day routes, the first time the stops coincide then should be recorded as a gossip exchange for both the bus drivers', () => {
    //given
    const busDriver0: BusDriver = new BusDriver([3,1,2,3]);
    const busDriver1: BusDriver = new BusDriver([3,2,3,1]);
    const gossipId0: string = getFirstGossipOf(busDriver0);
    const gossipId1: string = getFirstGossipOf(busDriver1);
    const expectedGossipNet0: Set<string> = new Set<string>([gossipId0, gossipId1]);
    const expectedGossipNet1: Set<string> = new Set<string>([gossipId1, gossipId0]);

    //when
    busDriver0.gossipWith(busDriver1);
    console.log(busDriver0.gossipNet)
    console.log(busDriver1.gossipNet)
    const actualGossipNet0: Set<string> = busDriver0.gossipNet;
    const actualGossipNet1: Set<string> = busDriver1.gossipNet;


    //then
    expect(actualGossipNet0).toEqual(expectedGossipNet0);
    expect(actualGossipNet1).toEqual(expectedGossipNet1);
})

test('If two bus drivers gossip more than once and one of them gets new gossips in the meantime, the other\'s gossip network should be updated', () => {
    //given
    const busDriver0: BusDriver = new BusDriver([3,1,2,3]);
    const busDriver1: BusDriver = new BusDriver([3,2,3,1]);
    const busDriver2: BusDriver = new BusDriver([4,2,3,4,5]);
    const gossipId0: string = getFirstGossipOf(busDriver0);
    const gossipId1: string = getFirstGossipOf(busDriver1);
    const gossipId2: string = getFirstGossipOf(busDriver2);
    const expectedGossipNet0: Set<string> = new Set<string>([gossipId0, gossipId1, gossipId2]);

    //when
    busDriver0.gossipWith(busDriver1);
    busDriver1.gossipWith(busDriver2);
    busDriver1.gossipWith(busDriver0);
    const actualGossipNet0: Set<string> = busDriver0.gossipNet;


    //then
    expect(actualGossipNet0).toEqual(expectedGossipNet0);
})

test('Given two day routes, the stops needed to exchange gossip should be counted', () => {
    //given
    const busDriver0: BusDriver = new BusDriver([3,1,2,3]);
    const busDriver1: BusDriver = new BusDriver([3,2,3,1]);
    const expectedStopsNeededToGossip: number = 1;

    //when
    const actualStopsNeededToGossip: number = busDriver0.gossipWith(busDriver1);


    //then
    expect(actualStopsNeededToGossip).toEqual(expectedStopsNeededToGossip);
})

test('Given multiple day routes, the stops needed to exchange all gossip between all bus drivers should be counted and returned', () => {
    //given
    const dayRoutes: string = "3 1 2 3\n3 2 3 1\n4 2 3 4 5";
    const busDrivers: BusDriver[] = BusDriverUtils.createBusDriversFromString(dayRoutes);
    const expectedSteps: number = 5;

    //when
    const actualSteps: number| null = BusDriverUtils.stopsRequiredForDailyGossip(busDrivers);

    //then
    expect(actualSteps).toEqual(expectedSteps);
})
/**
 * [X] Given a route, the total day of work should be that route repeated to reach 480 minutes of driving
 * [X] Given two day routes, the first time the stops coincide then should be counted as a gossip exchange
 * [X] If two bus drivers gossip more than once and one of them gets new gossips, the gossip network should be updated
 * [X] Given two day routes, the stops needed to exchange gossip should be counted
 * [X] Given multiple day routes, the stops needed to exchange all gossip between all bus drivers should be counted and returned
 * [-] Given multiple day routes, if not every bus driver can know all gossip should return "never"
 * */