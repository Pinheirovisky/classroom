import React, { useState } from 'react';
import './App.css';

import { main } from './helpers/index.js'
import { parseDay } from './helpers/strings.js'
import { SchedulesResult } from './protocols/response';

const App: React.FC = () => {

  const [inputValue, setInputValue] = useState("0")

  const [result, setResult] = useState<SchedulesResult | null>(null)

  const handleSubmit = (): void => {

    const value = parseInt(inputValue, 10)

    const response: SchedulesResult = main(value)

    return setResult(response)
  }

  return (
    <div className="App">
      <div className="main">
        <h1>Wiser <span className="mark">Teaching</span> Platform</h1>
        <label htmlFor="students">
          Quantidade de alunos
        <input type="string" name="students" id="students" value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Buscar</button>

        {result && (
          <>
            {console.log(result)}
            <h3>Número <span>MÁXIMO</span> de professores: {result.max}</h3>
            <h3>Número <span>MÍNIMO</span> de professores: {result.min}</h3>
            <table>
              <tr>
                <th>Dia da semana</th>
                <th>Horário</th>
                <th>Salas simultâneas</th>
              </tr>
              {result.schedules.map((line, id) => {
                return (
                  <tr key={id}>
                    <td>{`${parseDay(Number((line.schedule.split('-'))[0]))}`}</td>
                    <td>{`${line.schedule.split('-')[1]}:00`}</td>
                    <td>{line.rooms_concurrently}</td>
                  </tr>
                )
              })}
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
