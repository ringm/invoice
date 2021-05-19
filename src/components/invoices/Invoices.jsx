import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 60px;
`

export default function Invoices({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}
