import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { cpfMask } from '../../../utils/formats';

import { Container, Card, Title, AreaTop, AreaSelect } from './styles';

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 40,
    fontSize: 16,
    border: 2,
    boxShadow: 'none',
    backgroundColor: 'transparent',
  }),
};

const Create: React.FC = () => {
  const history = useHistory();
  const [selectState, setSelect] = useState();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [genderOptions, setGender] = useState([
    { value: '1', label: 'Feminino', labelV: 'feminino' },
    { value: '2', label: 'Masculino', labelV: 'masculino' },
    { value: '3', label: 'Outro', labelV: 'outro' },
  ]);

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
          />
          <Button name="cadastraR" onClick={() => postUser()}>
            CADASTRAR
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Create;
