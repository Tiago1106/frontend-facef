import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Header from '../../components/Header';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, Card, Title, AreaTop, CardUsers } from './styles';

interface SchedulingProps {
  id: string;
  id_user: string;
  id_provider: string;
  id_service: string;
  scheduled_date: string;
  appointment: string;
  description: string;
}

const Scheduling: React.FC = () => {
  const [schedulings, setScheduling] = useState<SchedulingProps[]>([]);

  async function getScheduling(): Promise<void> {
    const response = await api.get('/scheduling');
    setScheduling(response.data);
  }

  useEffect(() => {
    getScheduling();
  }, []);

  async function deleteScheduling(idScheduling: string): Promise<void> {
    console.log('aqui bb');
    await api.delete(`/sheduling/${idScheduling}`);
    getScheduling();
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <Title>Lista de agendamentos</Title>
            <Button name="NOVO" />
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
                  <td>Tiago</td>
                  <td>Yuri Prestador</td>
                  <td>Corte masculino</td>
                  <td>{scheduling.scheduled_date}</td>
                  <td>{scheduling.appointment}</td>
                  <td>{scheduling.description}</td>

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
