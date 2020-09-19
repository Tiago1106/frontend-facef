import React from 'react';

import Logo from '../../assets/logo.png';

import { Container, AreaLogo, ImageSVG, Title } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <AreaLogo>
        <ImageSVG src={Logo} alt="marketing" />
      </AreaLogo>
      <Title href="/">Usuários</Title>
      <Title href="/providers">Prestadores</Title>
      <Title href="/services">Serviços</Title>
      <Title href="/schedulings">Agendamentos</Title>
    </Container>
  );
};

export default Header;
