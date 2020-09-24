import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { cpfMask } from '../../../utils/formats';

import { Container, Card, Title, AreaTop, AreaSelect } from './styles';

interface ParamsUser {
  id: string;
}

interface GenderState {
  value: string;
  label: string;
  labelV: string;
}

interface User {
  id: string;
  name: string;
  password: string;
  cpf: string;
  email: string;
  gender: string;
  _id: string;
}

const Create: React.FC = () => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: 40,
      fontSize: 16,
      border: 2,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: '#fff',
    }),
  };

  const { id }: ParamsUser = useParams();
  const history = useHistory();

  const [selectState, setSelect] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [genderOptions, setGender] = useState<GenderState[]>([
    { value: '1', label: 'Feminino', labelV: 'feminino' },
    { value: '2', label: 'Masculino', labelV: 'masculino' },
    { value: '3', label: 'Outro', labelV: 'outro' },
  ]);

  const [genderState, setGenderState] = useState<GenderState[]>([]);

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    async function getUser(): Promise<void> {
      const response = await api.get(`/users/${id}`);

      setUser(response.data);
    }

    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setCpf(user.cpf);
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setSelect(user.gender);
    }
  }, [user]);

  async function postUser(): Promise<void> {
    const data = {
      name,
      email,
      password,
      gender: selectState,
      cpf,
    };

    try {
      await api.post('/users', data);
      alert('Usuário criado com sucesso');
      history.push('/');
    } catch (error) {
      alert('Erro ao criar usuário');
    }
  }

  async function editUser(): Promise<void> {
    try {
      const { data } = await api.put(`/users/${user._id}`, {
        email, // só email por causa do mongo fdp
      });
      alert('atualizado com sucesso');
      history.push('/');
    } catch (err) {
      alert('error ao alterar o usuário');
    }
  }

  return (
    <div>
      <Header />
      <Container>
        <Card>
          <AreaTop>
            <FiArrowLeft
              color="#fff"
              size={20}
              onClick={() => history.push('/')}
            />

            <Title>{user ? 'Editar Usuário' : 'Cadastrar usuário'}</Title>
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
            value={cpf}
            maxLength={14}
            onChange={(e) => setCpf(cpfMask(e.target.value))}
          />
          <AreaSelect>
            <Select
              closeMenuOnSelect
              isMulti={false}
              styles={customStyles}
              options={genderOptions}
              className="basic-single"
              classNamePrefix="select"
              onChange={(value: any) => setSelect(value.labelV)}
              theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  text: '#fff',
                  ...theme.colors,
                  primary: '#6e6e6e',
                  primary75: '#fff',
                  primary25: '#6e6e6e',
                  neutral0: '#545454',
                },
              })}
            />
          </AreaSelect>
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          {user ? (
            <Button
              name="cadastraR"
              onClick={() => {
                editUser();
              }}
            >
              EDITAR
            </Button>
          ) : (
            <Button
              name="cadastraR"
              onClick={() => {
                postUser();
              }}
            >
              CADASTRAR
            </Button>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Create;
