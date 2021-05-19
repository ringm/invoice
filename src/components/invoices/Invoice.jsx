import React from 'react';
import styled, { css } from 'styled-components';
import { formatDate, formatMoney } from '../../helpers';

const Container = styled.div`
  background-color: ${props => props.theme.invoiceBg};
  border-radius: 8px;
  padding: 25px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-template-rows: auto 30px auto auto;
  transition: background-color .2s;

  @media(min-width: 768px) {
    justify-content: space-between;
    grid-template-columns: 75px 120px 130px minmax(100px, max-content) 105px 5px;
    grid-template-rows: auto;
    align-items: center;
    justify-items: start;
  }
`

const Id = styled.p`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: ${props => props.theme.fontPriColor};
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  transition: color .2s;

  &::before {
    content: '#';
    color: ${props => props.theme.fontSecColor};
    transition: color .2s;
  }

  @media(min-width: 768px) {
    grid-column: 1 / 2;
  }
`

const PaymentDue = styled.p`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  color: ${props => props.theme.fontSecColor};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  transition: color .2s;

  @media(min-width: 768px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: start;
    margin-bottom: 0;
  }
`

const ClientName = styled.p`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  justify-self: end;
  color: ${props => props.theme.fontSecColor};
  font-size: 12px;
  font-weight: 500;
  transition: color .2s;

  @media(min-width: 768px) {
    grid-column: 3 / 4;
    justify-self: start;
  }
`

const Total = styled.p`
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  color: ${props => props.theme.fontPriColor};
  font-size: 16px;
  font-weight: 700;
  transition: color .2s;

  &::before {
    content: '£ ';
  }

  @media(min-width: 768px) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
    justify-self: end;
  }
`

const StatusContainer = styled.div`
  grid-column: 3 / 4;
  grid-row: 3 / 5;
  width: 105px;
  justify-self: end;
  background-color: ${props => props.theme.themeName === 'light' ? 'rgba(55, 59, 83, 0.06)' : 'rgba(223, 227, 250, 0.06)'};
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(min-width: 768px) {
    grid-column: 5 / 6;
    grid-row: 1 / 2;
    justify-self: end;
  }

  ${props => props.status === 'pending' && css`
    background-color: rgba(255, 143, 0, 0.06);
  `}
  ${props => props.status === 'paid' && css`
    background-color: rgba(51, 214, 159, 0.06);
  `}
`

const Status = styled.p`
  color: ${props => props.theme.themeName === 'light' ? '#373B53' : '#DFE3FA'};
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
  transition: color .2s;

  ${props => props.status === 'pending' && css`
    color: #FF8F00;
  `}
  ${props => props.status === 'paid' && css`
    color: #33D69F;
  `}

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.themeName === 'light' ? '#373B53' : '#DFE3FA'};
    border-radius: 20px;
    margin-right: 10px;
    transition: background-color .2s;

    ${props => props.status === 'pending' && css`
      background-color: #FF8F00;
    `}
    ${props => props.status === 'paid' && css`
      background-color: #33D69F;
    `}
  }
`

const Arrow = styled.svg`
  width: 7px;
  height: 11px;
  display: none;

  @media(min-width: 768px) {
    grid-column: 6 / 7;
    grid-row: 1 / 2;
    display: inline-block;
    justify-self: center;
    cursor: pointer;
  }
`

export default function Invoice({ invoice }) {
  const total = invoice.items.reduce((acc, curr) => curr.total + acc, 0).toFixed(2);

  return (
    <Container>
      <Id>{invoice.id}</Id>
      <PaymentDue>Due {formatDate(invoice.paymentDue)}</PaymentDue>
      <ClientName>{invoice.clientName}</ClientName>
      <Total>{formatMoney(total)}</Total>
      <StatusContainer status={invoice.status}>
        <Status status={invoice.status}>{invoice.status}</Status>
      </StatusContainer>
      <Arrow xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
      </Arrow>
    </Container>
  )
}
