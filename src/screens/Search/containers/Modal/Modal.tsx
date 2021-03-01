import React from 'react';
import { MockSearch } from 'protocols/response';

// Styles
import Wrapper from './Modal.styles';

interface ModalProps {
  mockSearch: MockSearch;
  setModalOpen: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  mockSearch,
  setModalOpen,
}: ModalProps) => {
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dias por semana</th>
            <th>Período</th>
            <th>Dia da semana</th>
            <th>Horário</th>
            <th>Alunos</th>
          </tr>
        </thead>
        <tbody>
          {mockSearch.map((line) => {
            return (
              <tr key={line.id} className="line">
                <td>{line.id}</td>
                <td>{line.recorrencia}</td>
                <td>{line.periodo}</td>
                <td>{line.dia.join(', ')}</td>
                <td>{line.horario.join(', ')}</td>
                <td>{line.alunos.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="submit" onClick={() => setModalOpen(false)}>
        Fechar
      </button>
    </Wrapper>
  );
};

export default Modal;
