import React from 'react';
import styled from 'styled-components';
import { formatMoney } from '../../helpers';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 10px;
  align-items: center;
`
const ItemName = styled.p`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: ${props => props.theme.fontPriColor};
  font-weight: 700;
  font-size: 12px;
  transition: color .2s;
`
const ItemQuantity = styled.p`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  color: ${props => props.theme.themeName === 'dark' ? '#888EB0' : '#7E88C3'};
  font-size: 12px;
  font-weight: 700;
  transition: color .2s;
`
const ItemTotal = styled.p`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  justify-self: end;
  color: ${props => props.theme.fontPriColor};
  font-weight: 700;
  font-size: 12px;
  transition: color .2s;
`

export default function ViewInvoiceItem({ item }) {
  const itemPrice = formatMoney(item.price);
  const itemTotal = formatMoney(item.total);
  return (
    <Container>
      <ItemName>{item.name}</ItemName>
      <ItemQuantity>{item.quantity} x £ {parseInt(itemPrice).toFixed(2)}</ItemQuantity>
      <ItemTotal>£ {parseInt(itemTotal).toFixed(2)}</ItemTotal>
    </Container>
  )
}
