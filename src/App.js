import React, { Component } from 'react';
import {
  getCurrentTime,
  checkNext15Minutes,
  departures,
  every6Mins,
  every12Mins,
  every20Mins,
  everyHour24Hours,
} from './libs/times';
import Timetable from './components/Timetable';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.leedsTimes = every6Mins();
    this.wakefieldTimes = every12Mins();
    this.doncasterTimes = every20Mins();
    this.sheffieldTimes = everyHour24Hours();

    const currentTime = getCurrentTime();

    this.state = {
      currentTime: currentTime,
      leedsBuses: departures(currentTime, this.leedsTimes),
      wakefieldBuses: departures(currentTime, this.wakefieldTimes),
      doncasterBuses: departures(currentTime, this.doncasterTimes),
      sheffieldBuses: departures(currentTime, this.sheffieldTimes),
      alertLeeds: '',
      alertWakefield: '',
      alertDoncaster: '',
      alertSheffield: '',
    };
  }

  componentDidMount() {
    setInterval(() => {
      const { leedsBuses, wakefieldBuses, doncasterBuses, sheffieldBuses } = this.state;
      const currentTime = getCurrentTime();

      this.setState({
        currentTime: currentTime,
        alertLeeds: checkNext15Minutes(currentTime, leedsBuses),
        alertWakefield: checkNext15Minutes(currentTime, wakefieldBuses),
        alertDoncaster: checkNext15Minutes(currentTime, doncasterBuses),
        alertSheffield: checkNext15Minutes(currentTime, sheffieldBuses),
      });
    }, 1000);

    setInterval(() => {
      const currentTime = getCurrentTime();
      this.setState({
        leedsBuses: departures(currentTime, this.leedsTimes),
        wakefieldBuses: departures(currentTime, this.wakefieldTimes),
        doncasterBuses: departures(currentTime, this.doncasterTimes),
        sheffieldBuses: departures(currentTime, this.sheffieldTimes),
      });
    }, 60000);
  }

  render() {
    const {
      currentTime,
      leedsBuses,
      wakefieldBuses,
      doncasterBuses,
      sheffieldBuses,
      alertLeeds,
      alertWakefield,
      alertDoncaster,
      alertSheffield,
    } = this.state;

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
          <div className='split'>
            <p className='alert'>{alertLeeds}</p>
            <Timetable buses={leedsBuses} />
            <p className='alert'>{alertWakefield}</p>
            <Timetable buses={wakefieldBuses} />
          </div>
          <div className='split'>
            <p className='alert'>{alertDoncaster}</p>
            <Timetable buses={doncasterBuses} />
            <p className='alert'>{alertSheffield}</p>
            <Timetable buses={sheffieldBuses} />
          </div>
        </main>
      </div>
    );
  }
}
