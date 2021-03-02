import React, { useState, useEffect } from 'react';
import { Student } from 'new_backend/src/contracts';
import { Classroom } from 'protocols/response';
import { toast, ToastContainer } from 'react-toastify';

// Backend
import { Recurrence, Period } from 'new_backend/src/contracts/Classroom';
import { ScheduleDays } from 'new_backend/src/contracts/ScheduleDays';
import { main, mockListClassRooms } from 'new_backend/src';

// Templates
import { MainTemplate } from 'templates';

// Styles
import Wrapper from './Search.styles';

const Search: React.FC = () => {
  const [recorrencia, setRecorrencia] = useState<Recurrence>(1);
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [periodo, setPeriodo] = useState<Period>('manha');
  const [weekDays, setWeekDays] = useState<ScheduleDays | ''>('');

  const [mockAux, setMockAux] = useState<Classroom[]>([]);

  const [searchList, setSearchList] = useState<Classroom[]>([]);

  const [classSelected, setClassSelected] = useState<number | null>(null);

  useEffect(() => {
    const list = mockListClassRooms({
      numberClassroom: 25,
    });

    setMockAux(list);
    setSearchList(list);
  }, []);

  const handleSubmit = (): void => {
    const splitedWeekDays = weekDays.split(',');

    // const updatedSearchedList = mockAux.filter((item: Classroom) => {
    //   return (
    //     item.period === periodo && item.recurrence === recorrencia
    //     // item.day.includes(...splitedWeekDays)
    //   );
    // });

    const result = main(recorrencia, periodo, splitedWeekDays, mockAux);
    return setSearchList(result);
  };

  const addStudent = (lineId: number) => {
    const newArray: Classroom[] = [];

    mockAux.map((line) => {
      if (line.id === lineId) {
        return newArray.push({
          ...line,
          students: [...line.students, 1] as Student[],
        });
      }
      return newArray.push(line);
    });

    setClassSelected(lineId);

    toast.success('Adicionado com sucesso!');

    setSearchList(newArray);
    setMockAux(newArray);
  };

  const handleReset = () => setSearchList(mockAux);

  const handleRowClick = (lineId: number) => {
    if (hasSubscribed) {
      return toast.warning('Ja se inscreveu em uma turma');
    }
    setHasSubscribed(true);
    addStudent(lineId);
  };

  return (
    <MainTemplate>
      <Wrapper>
        <ToastContainer />
        <label htmlFor="frequency">
          Frequência de dias
          <select
            name="frequency"
            // value={recorrencia}
            onChange={(e) => {
              setRecorrencia(parseInt(e.target.value));
            }}
          >
            <option value={1}>1x por semana</option>
            <option value={2}>2x por semana</option>
          </select>
        </label>
        <label htmlFor="dayPeriod">
          Período da aula
          <select
            name="dayPeriod"
            // value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
          </select>
        </label>
        <label htmlFor="weekDay">
          Dias da semana
          <select
            name="weekDay"
            // value={weekDays}
            onChange={(e) => setWeekDays(e.target.value)}
          >
            <option value={['']}>Selecione</option>
            {recorrencia === 1 ? (
              <>
                <option value={['sexta']}>Sexta</option>
                <option value={['sabado']}>Sábado</option>
              </>
            ) : (
              <>
                <option value={['segunda', 'quarta']}>Segunda/Quarta</option>
                <option value={['terca', 'quinta']}>Terça/Quinta</option>
              </>
            )}
          </select>
        </label>

        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>
            Buscar
          </button>

          <button type="button" onClick={handleReset}>
            Resetar
          </button>
        </div>

        <>
          <table>
            <thead>
              <tr>
                <th>Frequência</th>
                <th>Período</th>
                <th>Dia da semana</th>
                <th>Horário</th>
                <th>Alunos</th>
              </tr>
            </thead>
            <tbody>
              {searchList.map((line) => {
                return (
                  <tr
                    key={line.id}
                    // eslint-disable-next-line prettier/prettier
                    className={`line ${classSelected === line.id ? 'selected' : ''}`}
                    onClick={() => handleRowClick(line.id)}
                  >
                    <td>{line.recurrence}</td>
                    <td>{line.period}</td>
                    <td>{line.day.join(',')}</td>
                    <td>{line.hour.join(',')}</td>
                    <td>{line.students.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      </Wrapper>
    </MainTemplate>
  );
};

export default Search;
