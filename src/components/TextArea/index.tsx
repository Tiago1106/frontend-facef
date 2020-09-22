import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, ...rest }) => {
  return (
    <Container>
      <textarea
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          height: '100%',
          border: 'none',
          color: '#fff',
        }}
        name={name}
        {...rest}
      />
    </Container>
  );
};

export default TextArea;
