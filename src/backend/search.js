const mockRandomAlunos = (index) => {
  return { aluno: `Aluno #${index}`, skill: 0 };
};

const listAlunos = (number = 0) => {
  return Array.from(Array(number).keys()).map((index) =>
    mockRandomAlunos(index),
  );
};

const getRandomIndex = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const sortRecurrence = () => {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return randomIntFromInterval(1, 2);
};

const sortSchedule = (recurrence) => {
  const hour = getRandomIndex(hours);
  const day = getRandomIndex(days);

  if (recurrence === 1) {
    return {
      hour1: hour,
      day1: day,
    };
  }

  let hour2 = getRandomIndex(hours);
  let day2 = getRandomIndex(days);

  if (day2 === day) {
    while (day2 === day) {
      day2 = getRandomIndex(days);
    }
  }

  return {
    day1: day,
    hour1: hour,
    day2: day2,
    hour2: hour2,
  };
};

const parseDay = (number) => {
  switch (number) {
    case 1:
      return 'segunda';
    case 2:
      return 'terca';
    case 3:
      return 'quarta';

    case 4:
      return 'quinta';
    case 5:
      return 'sexta';

    default:
      return 'NOT VALID';
  }
};

let count = 0;
const sala = (numberAluno) => {
  const alunos = listAlunos(numberAluno);
  const recorrencia = sortRecurrence();
  const diaRandom = sortSchedule(recorrencia);
  const dias =
    Object.keys(diaRandom).length > 2
      ? [diaRandom['day1'], diaRandom['day2']]
      : [diaRandom['day1']];
  const hours =
    Object.keys(diaRandom).length > 2
      ? [diaRandom['hour1'], diaRandom['hour2']]
      : [diaRandom['hour1']];
  const id = ++count;
  return {
    id,
    alunos,
    recorrencia,
    periodo: 'manha',
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
    dia: dias.map((dia) => parseDay(dia)),
    horario: hours.map((hour) => `${String(hour).padStart(2, '0')}:00`),
  };
};

const mockListSalas = (numberSala = 0, numberAluno = 4) => {
  return Array.from(Array(numberSala).keys()).map(() => {
    return sala(numberAluno);
  });
};

const days = [1, 2, 3, 4, 5];
const hours = [7, 8];
let qtdSala = 5;
let qdtAluno = 7;
let salas = mockListSalas(qtdSala, qdtAluno);

// let salas = [
//     {
//         id: 1,
//         alunos : listAlunos(3),
//         recorrencia : 1,
//         periodo : 'manha',
//         skills : ['l1', 'l2', 'l3','s1', 's2', 's3', 'r1', 'r2', 'r3', 'w1', 'w2', 'w3'],
//         // data : ['2021-02-']
//         dia : ['segunda'],
//         horario : ['10:00']
//     },
//     {
//         id: 2,
//         alunos : listAlunos(4),
//         recorrencia : 1,
//         periodo : 'manha',
//         skills : ['l1', 'l2', 'l3','s1', 's2', 's3', 'r1', 'r2', 'r3', 'w1', 'w2', 'w3'],
//         // data : ['2021-02-']
//         dia : ['segunda'],
//         horario : ['10:00']
//     },
//     {
//         id: 3,
//         alunos : listAlunos(11),
//         recorrencia : 2,
//         periodo : 'tarde',
//         skills : ['l1', 'l2', 'l3','s1', 's2', 's3', 'r1', 'r2', 'r3', 'w1', 'w2', 'w3'],
//         // data : ['2021-02-']
//         dia : ['terca', 'quarta'],
//         horario : ['10:00', '09:00']
//     },
//     {
//         id: 4,
//         alunos : listAlunos(12),
//         recorrencia : 2,
//         periodo : 'tarde',
//         skills : ['l1', 'l2', 'l3','s1', 's2', 's3', 'r1', 'r2', 'r3', 'w1', 'w2', 'w3'],
//         // data : ['2021-02-']
//         dia : ['terca', 'quarta'],
//         horario : ['10:00', '09:00']
//     },
//     {
//         id: 5,
//         alunos : listAlunos(11),
//         recorrencia : 1,
//         periodo : 'tarde',
//         skills : ['l1', 'l2', 'l3','s1', 's2', 's3', 'r1', 'r2', 'r3', 'w1', 'w2', 'w3'],
//         // data : ['2021-02-']
//         dia : ['segunda'],
//         horario : ['09:00']
//     }
// ]

function main(recorrencia, periodo, dia) {
  const salasPossiveis = possiveisSalas(recorrencia, periodo, dia);
  const salasFiltradas = filtrarSalas(salasPossiveis);
  const value = salasRelevantesParaNegocio(salasFiltradas);
  return value;
}

function salasRelevantesParaNegocio(salasPossiveis) {
  if (salasPossiveis.length > 5) {
    return salasPossiveis.slice(0, 4);
  }
  return salasPossiveis;
}

function diasIguais(diaSala, dia) {
  if (diaSala.length > 1) {
    return diaSala.includes(dia[0]) && diaSala.includes(dia[1]);
  }
  return diaSala.includes(dia[0]);
}

function horariosIguais(horarioSala, horario) {
  if (horarioSala.length > 1) {
    return horarioSala.includes(horario[0]) && horarioSala.includes(horario[1]);
  }
  return horarioSala.includes(horario[0]);
}

function filtrarSalas(salasPossiveis) {
  return salasPossiveis.reduce((acc, cur) => {
    let salaIgual = acc.find((sala) => {
      return (
        sala.recorrencia === cur.recorrencia &&
        sala.periodo === cur.periodo &&
        diasIguais(sala.dia, cur.dia) &&
        horariosIguais(sala.horario, cur.horario)
      );
    });
    if (salaIgual) {
      if (salaIgual.alunos.length < cur.alunos.length) {
        salaIgual = { ...cur };
      }

      return acc;
    }

    acc.push(cur);

    return acc;
  }, []);
}

// function validarSalasMaisRelevantes(salasPosisveis) {
//   if (salasPossiveis.length) {
//   } else {
//   }
// }

//Busca as possiveis salas para o aluno baseado na recorrencia, periodo e dia;
function possiveisSalas(recorrencia, periodo, dia) {
  const salasLiberadas = [];
  salas.forEach((sala) => {
    if (recorrencia === 1 && sala.recorrencia === 1) {
      if (
        sala.dia[0] === dia[0] &&
        sala.periodo === periodo &&
        verificarEntradaNaTurma(sala)
      ) {
        salasLiberadas.push(sala);
      } else if (sala.dia[0] === dia[0] && verificarEntradaNaTurma(sala)) {
        salasLiberadas.push(sala);
      } else if (sala.periodo === periodo && verificarEntradaNaTurma(sala)) {
        salasLiberadas.push(sala);
      }
    } else {
      if (
        sala.dia.includes(dia[0]) &&
        sala.dia.includes(dia[1]) &&
        sala.periodo === periodo &&
        verificarEntradaNaTurma(sala)
      ) {
        salasLiberadas.push(sala);
      } else if (
        (sala.dia.includes(dia[0]) || sala.dia.includes(dia[1])) &&
        sala.periodo === periodo &&
        verificarEntradaNaTurma(sala)
      ) {
        salasLiberadas.push(sala);
      } else if (
        (sala.dia.includes(dia[0]) || sala.dia.includes(dia[1])) &&
        verificarEntradaNaTurma(sala)
      ) {
        salasLiberadas.push(sala);
      } else if (sala.periodo === periodo && verificarEntradaNaTurma(sala)) {
        salasLiberadas.push(sala);
      }
    }
  });
  return salasLiberadas;
}

function verificarEntradaNaTurma(sala) {
  if (sala.alunos.length < 12 && sala.skills[0].includes('1')) {
    return true;
  }
  return false;
}

// main(1, 'manha', ['segunda']);

export { main, mockListSalas };
