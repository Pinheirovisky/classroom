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
  const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(
    null,
  );

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

    const result = [
      ...main(recorrencia, periodo, splitedWeekDays, mockAux),
      {
        id: 200,
        students: [],
        recurrence: 1,
        period: 'manha',
        skills: [
          's1',
          's2',
          's3',
          'r1',
          'r2',
          'r3',
          'w1',
          'w2',
          'w3',
          'l1',
          'l2',
          'l3',
        ],
        actual_skill: 's1',
        day: ['2021-03-25 09:59:21'],
        hour: ['08:00'],
        is_new: true,
      },
    ];

    // const isNewExists = result.find((item: Classroom) => item.is_new);

    return setSearchList(result);
  };

  const addStudent = (lineClassroom: Classroom) => {
    const newArray: Classroom[] = [];

    if (lineClassroom.is_new) {
      newArray.push({
        ...lineClassroom,
        students: [...lineClassroom.students, 1] as Student[],
      });

      setCurrentClassroom({
        ...lineClassroom,
        students: [...lineClassroom.students, 1] as Student[],
      });
    }

    mockAux.map((line) => {
      if (line.id === lineClassroom.id) {
        if (line.is_new) {
          //aqui seria a requisição de adicionar aluno
        }
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

    setClassSelected(lineClassroom.id);

    toast.success('Adicionado com sucesso!');

    setSearchList(newArray);
    setMockAux(newArray);
  };

  const handleReset = () => setSearchList(mockAux);

  const handleRowClick = (line: Classroom) => {
    if (hasSubscribed) {
      return toast.warning('Já se inscreveu em uma turma');
    }
    setHasSubscribed(true);
    addStudent(line);
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
                  onClick={() => handleRowClick(currentClassroom)}
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
