import React, { Component } from 'react';
import BusTimetable from './classes/BusTimetable';
import Timetable from './components/Timetable';
import './App.css';

const timetable = new BusTimetable();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: this.getCurrentTime(),
      buses: timetable.findNextTwoBuses(
        timetable.leedsTimes,
        timetable.wakefieldTimes,
        timetable.doncasterTimes,
        timetable.sheffieldTimes
      ),
    };
  }

  componentDidMount() {
    this.timer();
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    const hh = hours < 10 ? '0' + hours : hours;
    const mm = mins < 10 ? '0' + mins : mins;
    const ss = secs < 10 ? '0' + secs : secs;
    return hh + ':' + mm + ':' + ss;
  }

  timer() {
    setInterval(() => {
      this.setState({
        currentTime: this.getCurrentTime(),
        buses: timetable.findNextTwoBuses(
          timetable.leedsTimes,
          timetable.wakefieldTimes,
          timetable.doncasterTimes,
          timetable.sheffieldTimes
        ),
      });
    }, 1000);
  }

  // TODO: All buses leaving the station should be represented.
  render() {
    return (
      <div className='App'>
        <header>
          <h1>bus departures</h1>
          <div className='timer'>Time now: {this.state.currentTime}</div>
        </header>
        <main>
          <div>
            <Timetable buses={this.state.buses} />
          </div>
        </main>
      </div>
    );
  }
}
