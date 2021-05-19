import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: min(90%, 730px);
  margin-bottom: 10px;
  align-items: flex-start;
`

const Arrow = styled.svg`
  width: 7px;
  height: 11px;
  margin-right: 16px;
  cursor: pointer;
`

const ArrowText = styled.p`
  color: ${props => props.theme.fontPriColor};
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: color .2s;
`

export default function ViewInvoiceNav() {
  return (
    <Container>
      <Arrow xmlns="http://www.w3.org/2000/svg">
        <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
      </Arrow>
      <ArrowText>Go back</ArrowText>
    </Container>
  )
}
