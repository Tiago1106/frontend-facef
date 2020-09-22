import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { cpfMask, celPhoneMask } from '../../../utils/formats';

import { Container, Card, Title, AreaTop } from './styles';

const Create: React.FC = () => {
  const history = useHistory();
  const [selectState, setSelect] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');

  async function postProvider(): Promise<void> {
    const data = {
      name,
      email,
      password,
      description,
      permission: 'provider',
      score: '5',
      cpf,
    };

    try {
      await api.post('/provider', data);
      alert('Prestador criado com sucesso');
      history.push('/providers');
    } catch (error) {
      alert('Erro ao criar prestador');
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
            <Title>Cadastrar usuário</Title>
          </AreaTop>
          <Input
            name="name"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="cpf"
            placeholder="CPF"
            value={cpfMask(cpf)}
            maxLength={14}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Input
            name="phone"
            placeholder="Telefone"
            value={celPhoneMask(cellphone)}
            maxLength={14}
            onChange={(e) => setCellphone(e.target.value)}
          />
          <TextArea
            name="description"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button name="cadastraR" onClick={() => postProvider()}>
            CADASTRAR
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Create;
