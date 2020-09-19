import React, { useState, useEffect, useCallback } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Header from '../../components/Header';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, Card, Title, AreaTop, CardUsers } from './styles';

interface UserProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  async function getUsers(): Promise<void> {
    const response = await api.get('/users');
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(idUser: string): Promise<void> {
    console.log('aqui bb');
    await api.delete(`/users/${idUser}`);
    getUsers();
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <Title>Lista de usuários</Title>
            <Button name="NOVO" />
          </AreaTop>
          <CardUsers>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: UserProps) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cpf}</td>

                  <div>
                    <AiFillEdit color="#fff" size={30} />
                    <AiFillDelete
                      color="#fff"
                      size={30}
                      onClick={() => deleteUser(user.id)}
                    />
                  </div>
                </tr>
              ))}
            </tbody>
          </CardUsers>
        </Card>
      </Container>
    </>
  );
};

export default Users;
