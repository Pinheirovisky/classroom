import React, { useState } from 'react';
import { SchedulesResult } from 'protocols/response';
import { main } from 'backend';
import { parseDay } from 'helpers/strings';

// Templates
import { MainTemplate } from 'templates';

// Styles
import Wrapper from './Classroom.styles';

const Classroom: React.FC = () => {
  const [inputValue, setInputValue] = useState('0');

  const [result, setResult] = useState<SchedulesResult | null>(null);

  const handleSubmit = (): void => {
    const value = parseInt(inputValue, 10);

    const response: SchedulesResult = main(value);

    return setResult(response);
  };

  return (
    <MainTemplate>
      <Wrapper>
        <label htmlFor="students">
          Quantidade de alunos
          <input
            type="string"
            name="students"
            id="students"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>

        {result && (
          <>
            <h3>
              Número <span>MÁXIMO</span> de professores: {result.max}
            </h3>
            <h3>
              Número <span>MÍNIMO</span> de professores: {result.min}
            </h3>
            <table>
              <tr>
                <th>Dia da semana</th>
                <th>Horário</th>
                <th>Salas simultâneas</th>
              </tr>
              {result.schedules.map((line, id) => {
                return (
                  <tr key={id}>
                    <td>{`${parseDay(
                      Number(line.schedule.split('-')[0]),
                    )}`}</td>
                    <td>{`${line.schedule.split('-')[1]}:00`}</td>
                    <td>{line.rooms_concurrently}</td>
                  </tr>
                );
              })}
            </table>
          </>
        )}
      </Wrapper>
    </MainTemplate>
  );
};

export default Classroom;
