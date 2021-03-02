import React from 'react';
import { Period, Recurrence, ScheduleDays } from 'new_backend/src/contracts';

interface FormProps {
  recorrencia: Recurrence;
  setRecorrencia: React.Dispatch<React.SetStateAction<Recurrence>>;
  setPeriodo: React.Dispatch<React.SetStateAction<Period>>;
  setWeekDays: React.Dispatch<React.SetStateAction<'' | ScheduleDays>>;
  handleSubmit: () => void;
  handleReset: () => void;
}

const Form: React.FC<FormProps> = ({
  recorrencia,
  setRecorrencia,
  setPeriodo,
  setWeekDays,
  handleSubmit,
  handleReset,
}: FormProps) => {
  return (
    <>
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
    </>
  );
};

export default Form;
