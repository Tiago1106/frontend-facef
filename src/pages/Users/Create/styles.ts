import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  display: flex;
  margin-top: 50px;
  width: 50%;
  background-color: #545454;
  border-radius: 15px;
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 16px;
  color: #fff;
  margin-left: 10px;
`;

export const AreaTop = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const AreaSelect = styled.div`
  background-color: #545454;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid #fff;
  border-radius: 5px;
  height: 42px;
  justify-content: center;
  align-items: center;
`;
