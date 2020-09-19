import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Header from '../../components/Header';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, AreaTop, Card, CardUsers, Title } from './styles';

interface ServicesProps {
  id: string;
  name_service: string;
  description: string;
  duraction: string;
  value: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<ServicesProps[]>(
    [] as ServicesProps[],
  );

  async function getServices(): Promise<void> {
    const response = await api.get('/services');
    setServices(response.data);
  }

  useEffect(() => {
    getServices();
  }, []);

  async function deleteServices(idServices: string): Promise<void> {
    console.log('aqui bb');
    await api.delete(`/services/${idServices}`);
    getServices();
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <Title>Lista de prestadores</Title>
            <Button name="NOVO" />
          </AreaTop>
          <CardUsers>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Duração</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service: ServicesProps) => (
                <tr key={service.id}>
                  <td>{service.name_service}</td>
                  <td>{service.description}</td>
                  <td>{`${service.duraction} MIN`}</td>
                  <td>{`R$${Number(service.value).toFixed(2)}`}</td>

                  <div>
                    <AiFillEdit color="#fff" size={30} />
                    <AiFillDelete
                      color="#fff"
                      size={30}
                      onClick={() => deleteServices(service.id)}
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

export default Services;