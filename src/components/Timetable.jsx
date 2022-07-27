import React from 'react';

function Timetable({ buses }) {
  const renderRows = (buses) => {
    buses.map((bus) => {
      const hours = new Date(bus.time).getHours();
      const hh = hours < 10 ? '0' + hours : hours;
      const mins = new Date(bus.time).getMinutes();
      const mm = mins < 10 ? '0' + mins : mins;

      return (
        <tr key={bus.time} className='row'>
          <td>{bus.route.toUpperCase()}</td>
          <td>{hh + ':' + mm}</td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr className='row'>
          <th>bus route</th>
          <th>times</th>
        </tr>
      </thead>
      <tbody>{renderRows(buses)}</tbody>
    </table>
  );
}

export default Timetable;
