import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 16px;
  color: #fff;
`;

export const Card = styled.div`
  display: flex;
  margin-top: 50px;
  width: 75%;
  background-color: #545454;
  border-radius: 15px;
  flex-direction: column;
`;

export const AreaTop = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const CardUsers = styled.table`
  width: 100%;
  background: #5555;
  border-radius: 6px;

  padding: 0 10px;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  thead td {
    padding: 12px;
  }
  strong {
    color: #333;
    display: block;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  tbody td {
    padding: 5px 12px;

    width: 220px;
    padding-bottom: 20px;
  }

  tbody {
    border-bottom: 1px solid #fff;
  }

  tbody tr {
    margin-bottom: 25px;
    align-items: center;
  }
`;
