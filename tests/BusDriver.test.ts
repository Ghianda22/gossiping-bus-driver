import BusDriver from "../src/BusDriver";

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
    const expectedGossipNet0: Set<string> = new Set<string>([busDriver1.id]);
    const expectedGossipNet1: Set<string> = new Set<string>([busDriver0.id]);

    //when
    busDriver0.gossipWith(busDriver1);
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
    const expectedGossipNet0: Set<string> = new Set<string>([busDriver0.id, busDriver1.id, busDriver2.id]);

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

/**
 * [X] Given a route, the total day of work should be that route repeated to reach 480 minutes of driving
 * [X] Given two day routes, the first time the stops coincide then should be counted as a gossip exchange
 * [-] If two bus drivers gossip more than once and one of them gets new gossips, the gossip network should be updated
 * [X] Given two day routes, the stops needed to exchange gossip should be counted
 * [-] Given multiple day routes, the stops needed to exchange all gossip between all bus drivers should be counted and returned
 * [-] Given multiple day routes, if not every bus driver can know all gossip should return "never"
 * */