import styled from 'styled-components';

export const Container = styled.div`
  background: #545454;
  border-radius: 5px;
  border: 2px solid;
  border-color: #fff;
  padding-left: 16px;
  padding-right: 3px;
  height: 100px;
  width: 100%;
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
