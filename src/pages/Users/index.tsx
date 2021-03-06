import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [users, setUsers] = useState<UserProps[]>([]);

  async function getUsers(): Promise<void> {
    const response = await api.get('/users');
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(idUser: string): Promise<void> {
    await api.delete(`/users/${idUser}`);
    getUsers();
  }

  function editUser(idUser: string): void {
    history.push(`/editUser/${idUser}`);
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <Title>Lista de usuários</Title>
            <Button onClick={() => history.push('/createUser')}>NOVO</Button>
          </AreaTop>
          <CardUsers>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: UserProps) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cpf}</td>

                  <td>
                    <div>
                      <AiFillEdit
                        color="#fff"
                        size={30}
                        onClick={() => {
                          editUser(user.id);
                        }}
                      />
                      <AiFillDelete
                        color="#fff"
                        size={30}
                        onClick={() => deleteUser(user.id)}
                      />
                    </div>
                  </td>
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
