import React from 'react';

import { Classroom } from 'protocols/response';
import { capitalize, polishPeriod } from 'helpers/strings';

import moment from 'moment';

interface TableProps {
  searchList: Classroom[];
  classSelected: number | null;
  handleRowClick: (lineId: Classroom) => void;
}

const Table: React.FC<TableProps> = ({
  searchList,
  classSelected,
  handleRowClick,
}: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Frequência</th>
          <th>Período</th>
          <th>Primeiro dia</th>
          <th>Dia da semana</th>
          <th>Horário</th>
          <th>Alunos</th>
          <th>Skill</th>
        </tr>
      </thead>
      <tbody>
        {searchList.map((line) => {
          return (
            <tr
              key={line.id}
              // eslint-disable-next-line prettier/prettier
              className={`line ${classSelected === line.id ? 'selected' : ''} ${line.students.length === 12 ? 'max' : ''}`}
              onClick={() => handleRowClick(line)}
            >
              <td>{line.recurrence}</td>
              <td>
                {capitalize(
                  line.period === 'manha' ? polishPeriod() : line.period,
                )}
              </td>
              <td>{moment(line.actual_schedule).format('DD/MM')}</td>
              <td>
                {line.day.map((day, id) => (
                  <li className="td-list" key={id}>
                    {capitalize(day)}
                  </li>
                ))}
              </td>
              <td>
                {line.hour.map((hour, id) => (
                  <li className="td-list" key={id}>
                    {hour}
                  </li>
                ))}
              </td>
              <td>{line.students.length}</td>
              <td>{line.actual_skill}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
