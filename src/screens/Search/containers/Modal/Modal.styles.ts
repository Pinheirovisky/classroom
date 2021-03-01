import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px;
  position: absolute;
  z-index: 3;
  width: 100%;
  max-width: 600px;
  border: 1px solid #fff;
  background-color: #fff;
  border-top-width: 10px;
  border-radius: 8px;
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  border-top-color: #383e71;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: growUp 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;

  @keyframes growUp {
    from {
      width: 0;
      height: 0;
      visibility: hidden;
    }
    to {
      max-width: 350px;
      width: 100%;
      height: 400px;
      visibility: block;
    }
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

  button {
    margin-top: 10px;
    cursor: pointer;
  }
`;

export default Wrapper;
