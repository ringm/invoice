import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: min(90%, 730px);
  height: 90px;
  background-color: ${props => props.theme.invoiceBg};
  border-radius: 8px;
  transition: background-color .2s;
`

const HeaderTitle = styled.p`
  color: ${props => props.theme.fontSecColor};
  font-weight: 500;
  font-size: 12px;
  transition: color .2s;
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

export default function ViewInvoiceHeader({ invoice }) {
  return (
    <Container>
      <HeaderTitle>Status</HeaderTitle>
      <StatusContainer status={invoice.status}>
        <Status status={invoice.status}>{invoice.status}</Status>
      </StatusContainer>
    </Container>
  )
}
