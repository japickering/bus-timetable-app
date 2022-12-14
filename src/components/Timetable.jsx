import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Timetable({ buses }) {
  const renderRows = (buses) => {
    return buses.map((bus) => {
      const hours = new Date(bus.time).getHours();
      const hh = hours < 10 ? '0' + hours : hours;
      const mins = new Date(bus.time).getMinutes();
      const mm = mins < 10 ? '0' + mins : mins;
      const time = hh + ':' + mm;

      return (
        <tr key={uuidv4()} className='row'>
          <td>
            {bus.route} {bus.name}
          </td>
          <td>{time}</td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>bus route</th>
          <th>departs</th>
        </tr>
      </thead>
      <tbody>{renderRows(buses)}</tbody>
    </table>
  );
}

export default Timetable;
