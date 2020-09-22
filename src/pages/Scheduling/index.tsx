import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, Card, Title, AreaTop, CardUsers } from './styles';

interface SchedulingProps {
  id: string;
  name_user: string;
  name_provider: string;
  name_service: string;
  scheduled_date: string;
  appointment: string;
  obsertation: string;
}

const Scheduling: React.FC = () => {
  const history = useHistory();
  const [schedulings, setScheduling] = useState<SchedulingProps[]>([]);

  async function getScheduling(): Promise<void> {
    const response = await api.get('/scheduling');
    setScheduling(response.data);
  }

  useEffect(() => {
    getScheduling();
  }, []);

  async function deleteScheduling(idScheduling: string): Promise<void> {
    await api.delete(`/scheduling/${idScheduling}`);
    getScheduling();
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <Title>Lista de agendamentos</Title>
            <Button onClick={() => history.push('/createSchedulings')}>
              NOVO
            </Button>
          </AreaTop>
          <CardUsers>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Prestador</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Descrição</th>
              </tr>
            </thead>

            <tbody>
              {schedulings.map((scheduling: SchedulingProps) => (
                <tr key={scheduling.id}>
                  <td>{scheduling.name_user}</td>
                  <td>{scheduling.name_provider}</td>
                  <td>{scheduling.name_service}</td>
                  <td>{scheduling.scheduled_date}</td>
                  <td>{scheduling.appointment}</td>
                  <td>{scheduling.obsertation}</td>

                  <div>
                    <AiFillEdit color="#fff" size={30} />
                    <AiFillDelete
                      color="#fff"
                      size={30}
                      onClick={() => deleteScheduling(scheduling.id)}
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

export default Scheduling;
