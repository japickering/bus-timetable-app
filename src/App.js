import React, { Component } from 'react';
import Timetable from './components/Timetable';
import './App.css';

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const hh = hours < 10 ? '0' + hours : hours;
  const mm = mins < 10 ? '0' + mins : mins;
  const ss = secs < 10 ? '0' + secs : secs;
  return hh + ':' + mm + ':' + ss;
}

function departures(currentTime, leedsTimes, wakefieldTimes, doncasterTimes, sheffieldTimes) {
  const today = new Date(`2022-07-28T${currentTime}`);
  const now = today.setTime(today);
  const buses = [...leedsTimes, ...wakefieldTimes, ...doncasterTimes, ...sheffieldTimes];
  //  console.log(buses);
  const maxRows = 15;
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

  return [{ route: 'no results', time: '' }];
}

function checkNext15Minutes(currentTime, buses) {
  const today = new Date(`2022-07-28T${currentTime}`);
  const now = today.setTime(today);
  const quarterHour = 900000; // 15 mins in milliseconds
  const delta = Math.abs(buses[0].time - now);
  console.log('time delta', delta);

  return delta > quarterHour ? 'No buses due in the next 15 minutes' : `Next bus to ${buses[0].name} arriving soon`;
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.leedsTimes = this.every6Mins();
    this.wakefieldTimes = this.every12Mins();
    this.doncasterTimes = this.every20Mins();
    this.sheffieldTimes = this.everyHour24Hours();

    const buses = departures(
      getCurrentTime(),
      this.leedsTimes,
      this.wakefieldTimes,
      this.doncasterTimes,
      this.sheffieldTimes
    );

    this.state = {
      currentTime: getCurrentTime(),
      buses: buses,
      alert: checkNext15Minutes(getCurrentTime(), buses),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentTime: getCurrentTime(),
        alert: checkNext15Minutes(getCurrentTime(), this.state.buses),
      });
    }, 1000);
    setInterval(() => {
      this.setState({
        buses: departures(
          getCurrentTime(),
          this.leedsTimes,
          this.wakefieldTimes,
          this.doncasterTimes,
          this.sheffieldTimes
        ),
      });
    }, 60000);
  }

  // The X15 to SHEFFIELD departs every hour, on the hour, and is a 24-hour service.
  everyHour24Hours() {
    const arr = [];
    const now = new Date('2022-07-28T00:00:00');
    arr.push(now.setTime(now));
    const route = 'x52';
    const name = 'sheffield';

    for (var i = 0; i < 24; i++) {
      let time = now.setTime(now.getTime() + 60 * 60 * 1000);
      arr.push({ id: route + i, route: route, name: name, time: time });
    }

    return arr;
  }

  // The X78 to DONCASTER departs every 20 minutes and is a 24-hour service.
  every20Mins() {
    const arr = [];
    const now = new Date('2022-07-28T00:00:00');
    arr.push(now.setTime(now));
    const route = 'x78';
    const name = 'doncaster';

    for (var i = 0; i < 72; i++) {
      const time = now.setTime(now.getTime() + 20 * 60 * 1000);
      arr.push({ id: route + i, route: route, name: name, time: time });
    }

    return arr;
  }

  // The 52 to WAKEFIELD departs every 12 minutes. The service starts at 6am and the last bus departs at 9pm.
  every12Mins() {
    const arr = [];
    const now = new Date('2022-07-28T06:30:00');
    arr.push(now.setTime(now));
    const route = '52';
    const name = 'wakefield';

    for (var i = 0; i < 72; i++) {
      const time = now.setTime(now.getTime() + 12 * 60 * 1000);
      arr.push({ id: route + i, route: route, name: name, time: time });
    }

    return arr;
  }

  // The 126 to LEEDS departs every 6 minutes. The service starts at 5.30am and the last bus departs at 1.30am
  every6Mins() {
    const arr = [];
    const now = new Date('2022-07-28T05:30:00');
    arr.push(now.setTime(now));
    const route = '126';
    const name = 'leeds';

    for (var i = 0; i < 80; i++) {
      const time = now.setTime(now.getTime() + 6 * 60 * 1000);
      arr.push({ id: route + i, route: route, name: name, time: time });
    }

    return arr;
  }

  render() {
    const { alert, buses, currentTime } = this.state;

    return (
      <div className='App'>
        <header>
          <h1>bus departures</h1>
          <div className='timer'>
            <code>
              Time now: <span>{currentTime}</span>
            </code>
          </div>
        </header>
        <main>
          <div>
            <p className='alert'>{alert}</p>
            <Timetable buses={buses} />
          </div>
        </main>
      </div>
    );
  }
}
