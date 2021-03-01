import styled from 'styled-components';

interface WrapperProps {
  modalOpen: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${(props) =>
    props.modalOpen &&
    `&:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 1;
    left: 0;
    background-color: #000000b3;
    animation: changeBG 1s;
  }`}

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
    width: 600px;
    border: 1px solid #000;
    border-collapse: collapse;
    text-align: center;
  }

  .line {
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
  }
`;

export default Wrapper;
