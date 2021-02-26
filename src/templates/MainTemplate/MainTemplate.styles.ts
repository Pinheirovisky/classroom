import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  width: calc(100% - 40px);
  height: calc(100vh - 40px);
  background-color: rgb(5, 21, 36);

  .main {
    background-color: #fff;
    width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    border: 1px solid transparent;
    border-top: 10px solid rgb(6, 89, 237);
    border-bottom: 10px solid transparent;
    border-radius: 8px;

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
  }
`;

export default Wrapper;
