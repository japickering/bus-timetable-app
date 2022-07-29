export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const hh = hours < 10 ? '0' + hours : hours;
  const mm = mins < 10 ? '0' + mins : mins;
  const ss = secs < 10 ? '0' + secs : secs;
  return hh + ':' + mm + ':' + ss;
}

export function departures(currentTime, buses) {
  const today = new Date(`2022-07-28T${currentTime}`);
  const now = today.setTime(today);
  //  console.log(buses);
  const maxRows = 4;
  const results = [];
  let rows = 0;
  let i = 0;

  for (const bus of buses) {
    if (now < bus.time) {
      results.push(bus);
      rows++;
    } else {
      results.splice(i, 1);
    }
    if (rows === maxRows) {
      return results;
    }
    i++;
  }

  return [{ route: 'no results', time: null }];
}

export function checkNext15Minutes(currentTime, buses) {
  const today = new Date(`2022-07-28T${currentTime}`);
  const now = today.setTime(today);
  const quarterHour = 900000; // 15 mins in milliseconds
  const delta = Math.abs(buses[0].time - now);
  console.log('time delta', delta);

  return delta > quarterHour ? 'Please wait' : `${buses[0].name.toUpperCase()} bus arriving shortly`;
}

// The X15 to SHEFFIELD departs every hour, on the hour, and is a 24-hour service.
export function everyHour24Hours() {
  const arr = [];
  const now = new Date('2022-07-28T00:00:00');
  arr.push(now.setTime(now));
  const route = 'x52';
  const name = 'sheffield';

  for (var i = 0; i < 24; i++) {
    let time = now.setTime(now.getTime() + 60 * 60 * 1000);
    arr.push({ route: route, name: name, time: time });
  }

  return arr;
}

// The X78 to DONCASTER departs every 20 minutes and is a 24-hour service.
export function every20Mins() {
  const arr = [];
  const now = new Date('2022-07-28T00:00:00');
  arr.push(now.setTime(now));
  const route = 'x78';
  const name = 'doncaster';

  for (var i = 0; i < 72; i++) {
    const time = now.setTime(now.getTime() + 20 * 60 * 1000);
    arr.push({ route: route, name: name, time: time });
  }

  return arr;
}

// The 52 to WAKEFIELD departs every 12 minutes. The service starts at 6am and the last bus departs at 9pm.
export function every12Mins() {
  const arr = [];
  const now = new Date('2022-07-28T06:30:00');
  arr.push(now.setTime(now));
  const route = '52';
  const name = 'wakefield';

  for (var i = 0; i < 72; i++) {
    const time = now.setTime(now.getTime() + 12 * 60 * 1000);
    arr.push({ route: route, name: name, time: time });
  }

  return arr;
}

// The 126 to LEEDS departs every 6 minutes. The service starts at 5.30am and the last bus departs at 1.30am
export function every6Mins() {
  const arr = [];
  const now = new Date('2022-07-28T05:30:00');
  arr.push(now.setTime(now));
  const route = '126';
  const name = 'leeds';

  for (var i = 0; i < 80; i++) {
    const time = now.setTime(now.getTime() + 6 * 60 * 1000);
    arr.push({ route: route, name: name, time: time });
  }

  return arr;
}
