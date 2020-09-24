import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, AreaTop, Card, CardUsers, Title } from './styles';

interface ProviderProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
  score: string;
}

const Provider: React.FC = () => {
  const history = useHistory();
  const [providers, setProviders] = useState<ProviderProps[]>(
    [] as ProviderProps[],
  );

  async function getProviders(): Promise<void> {
    const response = await api.get('/provider');
    setProviders(response.data);
  }

  useEffect(() => {
    getProviders();
  }, []);

  async function deleteProvider(idProvider: string): Promise<void> {
    await api.delete(`/provider/${idProvider}`);
    getProviders();
  }

  function editProvider(idProvider: string): void {
    history.push(`/editProvider/${idProvider}`);
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <Title>Lista de prestadores</Title>
            <Button onClick={() => history.push('/createProvider')}>
              NOVO
            </Button>
          </AreaTop>
          <CardUsers>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider: ProviderProps) => (
                <tr key={provider.id}>
                  <td>{provider.name}</td>
                  <td>{provider.email}</td>
                  <td>{provider.cpf}</td>
                  <td>{provider.score}</td>
                  <td>
                    <div>
                      <AiFillEdit
                        color="#fff"
                        size={30}
                        onClick={() => editProvider(provider.id)}
                      />
                      <AiFillDelete
                        color="#fff"
                        size={30}
                        onClick={() => deleteProvider(provider.id)}
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

export default Provider;
