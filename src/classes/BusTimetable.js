class BusTimetable {
  constructor() {
    this.leedsTimes = this.every6Mins();
    this.wakefieldTimes = this.every12Mins();
    this.doncasterTimes = this.every20Mins();
    this.sheffieldTimes = this.everyHour24Hours();
  }

  // TODO: show when no buses are due to depart in the next 15 minutes
  checkNext15Minutes() {}

  // The X15 to SHEFFIELD departs every hour, on the hour, and is a 24-hour service.
  everyHour24Hours() {
    const arr = [];
    const now = new Date('2022-07-27T00:00:00');
    arr.push(now.setTime(now));

    for (var i = 0; i < 24; i++) {
      let t = now.setTime(now.getTime() + 60 * 60 * 1000);
      arr.push(t);
    }

    return arr;
  }

  // The X78 to DONCASTER departs every 20 minutes and is a 24-hour service.
  every20Mins() {
    const arr = [];
    const now = new Date('2022-07-27T00:00:00');
    arr.push(now.setTime(now));

    for (var i = 0; i < 72; i++) {
      const t = now.setTime(now.getTime() + 20 * 60 * 1000);
      arr.push(t);
    }

    return arr;
  }

  // The 52 to WAKEFIELD departs every 12 minutes. The service starts at 6am and the last bus departs at 9pm.
  every12Mins() {
    const arr = [];
    const now = new Date('2022-07-27T06:30:00');
    arr.push(now.setTime(now));

    for (var i = 0; i < 72; i++) {
      const t = now.setTime(now.getTime() + 12 * 60 * 1000);
      arr.push(t);
    }

    return arr;
  }

  // The 126 to LEEDS departs every 6 minutes. The service starts at 5.30am and the last bus departs at 1.30am
  every6Mins() {
    const arr = [];
    const now = new Date('2022-07-27T05:30:00');
    arr.push(now.setTime(now));

    for (var i = 0; i < 80; i++) {
      const t = now.setTime(now.getTime() + 6 * 60 * 1000);
      arr.push(t);
    }

    return arr;
  }

  findNextBuses(leedsTimes, wakefieldTimes, doncasterTimes, sheffieldTimes) {
    const today = new Date();
    //  console.log(today);
    const now = today.setTime(today);
    const maxResults = 2; // edit for more buses
    const results = [];
    let count = 0;

    // bus times => bus routes
    const leeds = leedsTimes.map((time) => {
      return { route: '126 leeds', time: time };
    });
    const wakefield = wakefieldTimes.map((time) => {
      return { route: '52 wakefield', time: time };
    });
    const doncaster = doncasterTimes.map((time) => {
      return { route: 'X78 doncaster', time: time };
    });
    const sheffield = sheffieldTimes.map((time) => {
      return { route: 'X15 sheffield', time: time };
    });
    const buses = leeds.concat(wakefield).concat(doncaster).concat(sheffield);
    //  const filtered = buses.filter((v, i, a) => a.indexOf(v) === i);
    //  buses.sort();

    for (const bus of buses) {
      if (now < bus.time) {
        results.push(bus);
        count++;
      }
      if (count === maxResults) {
        return results;
      }
    }
  }
}

module.exports = BusTimetable;
