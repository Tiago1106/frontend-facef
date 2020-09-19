import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 50px;
  background-color: #eb5424;
  border: 0;
  border-radius: 10px;
  color: #fff;

  &:hover {
    background-color: ${shade(0.2, '#eb5424')};
  }
`;
