import React from 'react';

import { Container } from './styles';

interface ButtonProps {
  name: string;
}

const Button: React.FC<ButtonProps> = ({ name }) => {
  return <Container>{name}</Container>;
};

export default Button;
