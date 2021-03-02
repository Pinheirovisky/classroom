import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons {
    width: 300px;
    display: flex;
    justify-content: space-around;

    button {
      width: 110px;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  input,
  select {
    margin-left: 5px;
  }

  label {
    margin-top: 10px;
  }

  table {
    margin-top: 20px;
  }

  table,
  th,
  td {
    width: 650px;
    border: 1px solid #000;
    border-collapse: collapse;
    text-align: center;

    .td-list {
      list-style-type: none;
    }
  }

  tr.selected {
    background-color: rgb(6, 89, 237);
    color: #fff;
  }

  .line {
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
  }
`;

export default Wrapper;
