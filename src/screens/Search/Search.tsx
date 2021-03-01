import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import mockSearch from 'backend/mock-search';
import { main, mockListSalas } from 'backend/search.js';

// Templates
import { MainTemplate } from 'templates';

// Containers
import Modal from './containers/Modal/Modal';

// Styles
import Wrapper from './Search.styles';
import { MockSearch } from 'protocols/response';

const mock = mockListSalas(20, 5);

const Search: React.FC = () => {
  const [search, setSearch] = useState(null);

  const [recorrencia, setRecorrencia] = useState(0);
  const [periodo, setPeriodo] = useState('manha');
  const [dia1, setDia1] = useState('segunda');
  const [dia2, setDia2] = useState('0');

  const [entireList, setEntireList] = useState<MockSearch[]>(mock);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (): void => {
    let dias = [dia1];

    if (dia2 !== '0') {
      dias = [dia1, dia2];
    }

    console.log(main(recorrencia, periodo, dias));

    return setSearch(main(recorrencia, periodo, dias));
  };

  const addStudent = (lineId: string) => {
    const newArray: MockSearch[] = [];

    entireList.map((line) => {
      if (line.id === lineId) {
        return newArray.push({
          ...line,
          alunos: [...line.alunos, 1],
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
            onChange={(e) => setRecorrencia(e.target.value)}
          >
            <option value="1">1x por semana</option>
            <option value="2">2x por semana</option>
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
          Primeiro dia
          <select
            name="weekDay"
            value={dia1}
            onChange={(e) => setDia1(e.target.value)}
          >
            <option value="segunda">Segunda-feira</option>
            <option value="terca">Terça-feira</option>
            <option value="quarta">Quarta-feira</option>
            <option value="quinta">Quinta-feira</option>
            <option value="sexta">Sexta-feira</option>
          </select>
        </label>
        {recorrencia && (
          <label htmlFor="weekDay">
            Segundo dia
            <select
              name="weekDay"
              value={dia2}
              onChange={(e) => setDia2(e.target.value)}
            >
              <option value="segunda">Segunda-feira</option>
              <option value="terca">Terça-feira</option>
              <option value="quarta">Quarta-feira</option>
              <option value="quinta">Quinta-feira</option>
              <option value="sexta">Sexta-feira</option>
            </select>
          </label>
        )}
        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>
            Buscar
          </button>
          {search && (
            <button type="submit" onClick={() => setModalOpen(!modalOpen)}>
              Visualizar salas
            </button>
          )}
        </div>

        {search && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Dias por semana</th>
                  <th>Período</th>
                  <th>Dia da semana</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody>
                {search.map((line) => {
                  return (
                    <tr
                      key={line.id}
                      className="line"
                      onClick={() => addStudent(line.id)}
                    >
                      <td>{line.recorrencia}</td>
                      <td>{line.periodo}</td>
                      <td>{line.dia.join(', ')}</td>
                      <td>{line.horario.join(', ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </Wrapper>
    </MainTemplate>
  );
};

export default Search;
