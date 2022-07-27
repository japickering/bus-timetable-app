import React, { Component } from 'react';
import './App.css';

import BusTimetable from './classes/BusTimetable';
import Timetable from './components/Timetable';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buses: [{ route: 'leeds', time: '00:00' }],
    };
  }

  componentDidMount() {
    this.timer();
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const hh = hours < 10 ? '0' + hours : hours;
    const mins = now.getMinutes();
    const mm = mins < 10 ? '0' + mins : mins;
    return hh + ':' + mm;
  }

  timer() {
    const { findNextTwoBuses, leedsTimes, wakefieldTimes, doncasterTimes, sheffieldTimes } = BusTimetable;

    setTimeout(() => {
      const buses = findNextTwoBuses(leedsTimes, wakefieldTimes, doncasterTimes, sheffieldTimes);

      this.setState({
        currentTime: this.getCurrentTime(),
        buses: buses,
      });
    }, 1000);
  }

  render() {
    const { buses } = this.state;
    return (
      <div className='App'>
        <header>
          <h1>bus departures</h1>
        </header>
        <main>
          <div className='split'>{this.state.currentTime && <div>{this.state.currentTime}</div>}</div>
          <div className='split'>
            <Timetable buses={buses} />
          </div>
        </main>
      </div>
    );
  }
}
