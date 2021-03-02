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
        <Form
          recorrencia={recorrencia}
          setRecorrencia={setRecorrencia}
          setPeriodo={setPeriodo}
          setWeekDays={setWeekDays}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />

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
