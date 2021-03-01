import { Student } from 'new_backend/src/contracts';
import { Classroom, MockSearch } from 'protocols/response';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// Templates
import { MainTemplate } from 'templates';
import { main, mockListClassRooms, mock } from '../../new_backend/src/index';
// Containers
import Modal from './containers/Modal/Modal';
// Styles
import Wrapper from './Search.styles';

console.log(mock);

const Search: React.FC = () => {
  const [search, setSearch] = useState<Classroom[]>(mock);
  const [recorrencia, setRecorrencia] = useState<number>(1);
  const [periodo, setPeriodo] = useState('manha');
  const [weekDays, setWeekDays] = useState('segunda');

  const [entireList, setEntireList] = useState<Classroom[]>(mock);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (): void => {
    const splitedWeekDays = weekDays.split(',');

    const updatedEntireList = mock.filter((item: Classroom) => {
      return (
        item.period === periodo &&
        item.recurrence === recorrencia &&
        item.day.includes(...splitedWeekDays)
      );
    });

    // const alou = main(recorrencia, periodo, splitedWeekDays, mock);
    return setEntireList(updatedEntireList);
  };

  const addStudent = (lineId: number) => {
    const newArray: Classroom[] = [];

    entireList.map((line) => {
      if (line.id === lineId) {
        return newArray.push({
          ...line,
          students: [...line.students, 1] as Student[],
        });
      }
      return newArray.push(line);
    });

    toast.success('Adidionado com sucesso!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setEntireList(newArray);
  };

  return (
    <MainTemplate>
      <ToastContainer />
      <Wrapper modalOpen={modalOpen}>
        {modalOpen && search && (
          <Modal mockSearch={entireList} setModalOpen={setModalOpen} />
        )}
        <label htmlFor="frequency">
          Frequência de dias
          <select
            name="frequency"
            value={recorrencia}
            onChange={(e) => {
              if (parseInt(e.target.value) === 2) {
                setWeekDays('segunda,quarta');
              }
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
            value={periodo}
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
            value={weekDays}
            onChange={(e) => setWeekDays(e.target.value)}
          >
            {recorrencia === 1 ? (
              <>
                <option value={['segunda']}>Segunda</option>
                <option value={['terca']}>Terça</option>
                <option value={['quarta']}>Quarta</option>
                <option value={['quinta']}>Quinta</option>
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

          <button type="button" onClick={() => setEntireList(mock)}>
            Resetar
          </button>
        </div>

        <>
          <table>
            <thead>
              <tr>
                <th>Dias por semana</th>
                <th>Período</th>
                <th>Dia da semana</th>
                <th>Horário</th>
                <th>Alunos</th>
              </tr>
            </thead>
            <tbody>
              {entireList.map((line) => {
                console.log(line);

                return (
                  <tr
                    key={line.id}
                    className="line"
                    onClick={() => addStudent(line.id)}
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
