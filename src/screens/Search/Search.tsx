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

// Containers
import Form from './containers/Form/Form';
import Table from './containers/Table/Table';

// Styles
import Wrapper from './Search.styles';
import { capitalize, polishPeriod } from 'helpers/strings';
import moment from 'moment';

const Search: React.FC = () => {
  const [recorrencia, setRecorrencia] = useState<Recurrence>(1);
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [periodo, setPeriodo] = useState<Period>('manha');
  const [weekDays, setWeekDays] = useState<ScheduleDays | ''>('');

  const [mockAux, setMockAux] = useState<Classroom[]>([]);
  const [searchList, setSearchList] = useState<Classroom[]>([]);

  const [classSelected, setClassSelected] = useState<number | null>(null);
  const [currentClassroom, setCurrentClassroom] = useState<Classroom>(null);

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
        newArray.push({
          ...line,
          students: [...line.students, 1] as Student[],
        });
        return setCurrentClassroom({
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
        <Form
          recorrencia={recorrencia}
          setRecorrencia={setRecorrencia}
          setPeriodo={setPeriodo}
          setWeekDays={setWeekDays}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />

        {currentClassroom && (
          <>
            <h2>Turma cadastrada</h2>
            <table>
              <thead>
                <tr>
                  <th>Frequência</th>
                  <th>Período</th>
                  <th>Primeiro dia</th>
                  <th>Dia da semana</th>
                  <th>Horário</th>
                  <th>Alunos</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  // eslint-disable-next-line prettier/prettier
                  className="line"
                  onClick={() => handleRowClick(currentClassroom.id)}
                >
                  <td>{currentClassroom.recurrence}</td>
                  <td>
                    {capitalize(
                      currentClassroom.period === 'manha'
                        ? polishPeriod()
                        : currentClassroom.period,
                    )}
                  </td>
                  <td>
                    {moment(currentClassroom.actual_schedule).format('DD/MM')}
                  </td>
                  <td>
                    {currentClassroom.day.map((day, id) => (
                      <li className="td-list" key={id}>
                        {capitalize(day)}
                      </li>
                    ))}
                  </td>
                  <td>
                    {currentClassroom.hour.map((hour, id) => (
                      <li className="td-list" key={id}>
                        {hour}
                      </li>
                    ))}
                  </td>
                  <td>{currentClassroom.students.length}</td>
                </tr>
              </tbody>
            </table>
            <h3>
              Link da primeria aula:
              <a
                target="_blank"
                rel="noreferrer"
                href="https://wisereducacao.zoom.us/j/2359481695"
              >
                link
              </a>
            </h3>
          </>
        )}

        <h2>Turmas abertas!</h2>
        <Table
          searchList={searchList}
          classSelected={classSelected}
          handleRowClick={handleRowClick}
        />
      </Wrapper>
    </MainTemplate>
  );
};

export default Search;
