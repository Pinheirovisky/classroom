import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 70px;
    margin-top: 10px;
  }

  h1 {
    margin-top: 0;
  }

  h1,
  span {
    color: rgb(6, 89, 237);
  }

  .mark {
    color: rgb(29 51 88 / 95%);
  }

  input {
    margin-left: 5px;
  }

  table,
  th,
  td {
    width: 600px;
    border: 1px solid #000;
    border-collapse: collapse;
    text-align: center;
  }
`;

export default Wrapper;
