import React from 'react';
import styled from 'styled-components';
import ViewInvoiceItem from './ViewInvoiceItem';
import { formatMoney } from '../../helpers';

const Container = styled.div`
  grid-column: 1 / 6;
`

const InvoiceItemList = styled.div`
  background-color: ${props => props.theme.themeName === 'dark' ? '#252945' : '#F9FAFE'};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  transition: background-color .2s;
`

const InvoiceTotalContainer = styled.div`
  background-color: ${props => props.theme.themeName === 'dark' ? '#0C0E16' : '#373B53'};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  transition: background-color .2s;
`

const InvoiceTotalTitle = styled.p`
  color: #fff;
  font-weight: 500;
  font-size: 12px;
`

const InvoiceTotalAmount = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`

export default function ViewInvoiceItemList({ items }) {
  const amountDue = items.reduce((acc, curr) => acc + (curr.total), 0).toFixed(2)
  return (
    <Container>
      <InvoiceItemList>
        {items.map(item => <ViewInvoiceItem item={item} />)}
      </InvoiceItemList>
      <InvoiceTotalContainer>
        <InvoiceTotalTitle>Amount Due</InvoiceTotalTitle>
        <InvoiceTotalAmount>£ {formatMoney(amountDue)}</InvoiceTotalAmount>
      </InvoiceTotalContainer>
    </Container>
  )
}
 