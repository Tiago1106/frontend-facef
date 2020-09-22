import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { dateMask, hourMask } from '../../../utils/formats';

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

interface datasProsp {
  value: string;
  label: string;
  labelV: string;
}

const Create: React.FC = () => {
  const history = useHistory();
  const [selectProvider, setProvider] = useState();
  const [selectService, setService] = useState();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [obsertation, setObsertation] = useState('');

  const [services, setServices] = useState<datasProsp[]>();
  const [providers, setProviders] = useState<datasProsp[]>();

  async function get(): Promise<void> {
    const responseService = await api.get('/services');
    const responseProvider = await api.get('/provider');

    const dataService: datasProsp[] = [];
    const dataProvider: datasProsp[] = [];
    responseService.data.map((service: any, i: number) => {
      dataService.push({
        value: i.toString(),
        label: service.name_service,
        labelV: service.name_service,
      });
    });
    responseProvider.data.map((provider: any, i: number) => {
      dataProvider.push({
        value: i.toString(),
        label: provider.name,
        labelV: provider.name,
      });
    });
    setServices(dataService);
    setProviders(dataProvider);
  }

  useEffect(() => {
    get();
  }, []);

  async function postUser(): Promise<void> {
    const data = {
      name_user: name,
      name_provider: selectProvider,
      name_service: selectService,
      scheduled_date: date,
      appointment: hour,
      obsertation,
    };

    try {
      await api.post('/scheduling', data);
      alert('Agendamento cadastrado com sucesso');
      history.push('/schedulings');
    } catch (error) {
      alert('Erro ao cadastrar agendamento');
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
          <AreaSelect>
            <Select
              closeMenuOnSelect
              isMulti={false}
              styles={customStyles}
              options={services}
              className="basic-single"
              classNamePrefix="select"
              onChange={(value: any) => setService(value.labelV)}
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
          <AreaSelect>
            <Select
              closeMenuOnSelect
              isMulti={false}
              styles={customStyles}
              options={providers}
              className="basic-single"
              classNamePrefix="select"
              onChange={(value: any) => setProvider(value.labelV)}
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
            name="hour"
            placeholder="Hora"
            value={hour}
            maxLength={5}
            onChange={(e) => setHour(hourMask(e.target.value))}
          />
          <Input
            name="date"
            placeholder="Data"
            value={date}
            maxLength={10}
            onChange={(e) => setDate(dateMask(e.target.value))}
          />
          <TextArea
            name="obsertation"
            placeholder="Observação"
            value={obsertation}
            onChange={(e) => setObsertation(e.target.value)}
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
