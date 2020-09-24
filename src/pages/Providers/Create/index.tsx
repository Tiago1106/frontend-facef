import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { cpfMask, celPhoneMask } from '../../../utils/formats';

import { Container, Card, Title, AreaTop } from './styles';

interface ParamsProvider {
  id: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  password: string;
  description?: string;
  opening_hours: Date;
  permission: string;
  score: string;
  cnpj?: string;
  cpf?: string;
  cellphone: string;
  _id: string;
}

const Create: React.FC = () => {
  const history = useHistory();
  const { id }: ParamsProvider = useParams();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string | undefined>('');
  const [cellphone, setCellphone] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [password, setPassword] = useState<string>('');

  const [provider, setProvider] = useState<Provider>({} as Provider);

  useEffect(() => {
    async function getProvider(): Promise<void> {
      const { data } = await api.get(`/provider/${id}`);

      setProvider(data);
    }

    getProvider();
  }, [id]);

  useEffect(() => {
    if (provider) {
      setCpf(provider.cpf);
      setName(provider.name);
      setEmail(provider.email);
      setPassword(provider.password);
      if (provider.description !== undefined || provider.description !== null) {
        setDescription(provider.description);
      }
      if (provider.cellphone !== undefined || provider.cellphone !== null) {
        setCellphone(provider.cellphone);
      }
    }
  }, [provider]);

  async function postProvider(): Promise<void> {
    const data = {
      name,
      email,
      password,
      description,
      cellphone,
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

  async function editProvoder(): Promise<void> {
    const data = {
      name,
      email,
      password,
      description,
      cpf,
      cellphone,
    };

    await api.put(`/provider/${provider._id}`, {
      cellphone,
    });

    history.push('/providers');
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
              onClick={() => history.push('/providers')}
            />
            <Title>
              {provider ? 'Editar prestador' : 'Cadastrar prestador'}
            </Title>
          </AreaTop>
          <Input
            name="name"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            name="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            name="cpf"
            placeholder="CPF"
            maxLength={14}
            onChange={(e) => setCpf(cpfMask(e.target.value))}
            value={cpf}
          />
          <Input
            name="phone"
            placeholder="Telefone"
            maxLength={14}
            onChange={(e) => setCellphone(celPhoneMask(e.target.value))}
            value={cellphone}
          />
          <TextArea
            name="description"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Input
            name="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          {provider ? (
            <Button name="cadastraR" onClick={() => editProvoder()}>
              EDITAR
            </Button>
          ) : (
            <Button name="cadastraR" onClick={() => postProvider()}>
              CADASTRAR
            </Button>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Create;
