import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(5, 21, 36);
  height: 100vh;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  width: calc(100% - 40px);

  .main {
    background-color: #fff;
    width: 750px;

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
