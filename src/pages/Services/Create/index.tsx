import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { currentMask } from '../../../utils/formats';

import { Container, Card, Title, AreaTop } from './styles';

interface ParamsService {
  id: string;
}

interface Service {
  name_service: string;
  description: string;
  duraction: string;
  value: string;
  _id: string;
  id: string;
}

const Create: React.FC = () => {
  const history = useHistory();

  const { id }: ParamsService = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duraction, setDuraction] = useState('');
  const [value, setValue] = useState('');

  const [service, setService] = useState({} as Service);

  useEffect(() => {
    async function getService(): Promise<void> {
      const response = await api.get(`/services/${id}`);

      setService(response.data);
    }

    getService();
  }, []);

  useEffect(() => {
    if (service) {
      setName(service.name_service);
      setDescription(service.description);
      setDuraction(service.duraction);
      setValue(service.value);
    }
  }, [service]);

  async function postServices(): Promise<void> {
    const data = {
      name_service: name,
      description,
      duraction,
      value,
    };

    try {
      await api.post('/services', data);
      alert('Serviço criado com sucesso');
      history.push('/services');
    } catch (error) {
      alert('Erro ao criar serviço');
    }
  }

  async function editService(): Promise<void> {
    // const requestData = {
    //   name_service: name,
    //   description,
    //   duraction,
    //   value,
    // };
    // try {
    //   await api.put(`/services/${service._id}`, data);
    //   alert('Serviço atualizado com sucesso');
    //   history.push('/services');
    // } catch (error) {
    //   alert('Erro ao atualizar serviço');
    // }
    history.push('/services');
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <FiArrowLeft
              color="#fff"
              size={20}
              onClick={() => history.push('/services')}
            />
            <Title>Cadastrar serviço</Title>
          </AreaTop>
          <Input
            name="name"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextArea
            name="description"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Input
            name="duraction"
            placeholder="Duração em MINUTOS"
            value={duraction}
            maxLength={3}
            onChange={(e) => setDuraction(e.target.value)}
          />
          <Input
            name="value"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(currentMask(e.target.value))}
          />
          {service ? (
            <Button name="cadastraR" onClick={() => editService()}>
              EDITAR
            </Button>
          ) : (
            <Button name="cadastraR" onClick={() => postServices()}>
              CADASTRAR
            </Button>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Create;
