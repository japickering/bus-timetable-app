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
    const max = 10; // edit for more results
    const buses = [];
    const results = [];
    let count = 0;

    for (let time of leedsTimes) {
      buses.push({ route: '126 leeds', time: time });
    }

    for (let time of wakefieldTimes) {
      buses.push({ route: '52 wakefield', time: time });
    }

    for (let time of doncasterTimes) {
      buses.push({ route: 'X78 doncaster', time: time });
    }

    for (let time of sheffieldTimes) {
      buses.push({ route: 'X15 sheffield', time: time });
    }

    //  const filtered = buses.filter((v, i, a) => a.indexOf(v) === i);
    //  buses.sort();
    //  console.log(buses);

    for (const bus of buses) {
      if (now < bus.time) {
        results.push(bus);
        count++;
      }
      if (count === max) {
        return results;
      }
    }
  }
}

module.exports = BusTimetable;
