import styled from 'styled-components';

export const Container = styled.div`
  background: #545454;
  border-radius: 5px;
  border: 2px solid;
  border-color: #fff;
  padding-left: 16px;
  padding-right: 3px;
  width: 100%;
  height: 42px;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    background-color: transparent;
    border: 0;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
`;
