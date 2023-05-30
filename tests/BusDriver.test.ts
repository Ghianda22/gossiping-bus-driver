import BusDriver from "../src/BusDriver";

test('Given a route, the total day of work should be that route repeated to reach 480 minutes of driving', () => {
    //given

    let busDriver: BusDriver = new BusDriver([3,1,2,3]);

    //when

    //then
    expect(busDriver.dayRoute.length).toEqual(480);
})


/**
 * Given a route, the total day of work should be that route repeated to reach 480 minutes of driving
 * Given two day routes, the first time the stops coincide then should be counted as a gossip exchange
 * Given multiple day routes,
 * */