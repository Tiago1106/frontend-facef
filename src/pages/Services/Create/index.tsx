import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { currentMask } from '../../../utils/formats';

import { Container, Card, Title, AreaTop } from './styles';

const Create: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duraction, setDuraction] = useState('');
  const [value, setValue] = useState('');

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

  return (
    <>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <FiArrowLeft
              color="#fff"
              size={20}
              onClick={() => history.back()}
            />
            <Title>Cadastrar serviço</Title>
          </AreaTop>
          <Input
            name="name"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <TextArea
            name="description"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
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
          <Button name="cadastraR" onClick={() => postServices()}>
            CADASTRAR
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Create;
