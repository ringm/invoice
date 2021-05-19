import styled from 'styled-components';
import { formatDate } from '../../helpers';
import ViewInvoiceItemList from './ViewInvoiceItemList'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;  
  grid-row-gap: 30px;
  padding: 30px 20px;
  width: min(90%, 730px);
  background-color: ${props => props.theme.invoiceBg};
  border-radius: 8px;
  transition: background-color .2s;
`

const IdContainer = styled.div`
  grid-column: 1 / 2;
`

const InvoiceId = styled.p`
  font-weight: 700;
  font-size: 12px;
  color: ${props => props.theme.fontPriColor};
  margin-bottom: 8px;
  transition: color .2s;

  &::before {
    content: '#';
    color: #7E88C3;
  }
`

const InvoiceDesc = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${props => props.theme.fontSecColor};
  transition: color .2s;
`

const AddressContainer = styled.div`
  grid-column: 1 / 2;
`

const AddressTxt = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${props => props.theme.fontSecColor};
  transition: color .2s;

  &+& {
    margin-top: 8px;
  }
`

const InvoiceDateContainer = styled.div`
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const InvoiceDateTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${props => props.theme.fontSecColor};
  margin-bottom: 12px;
  transition: color .2s;
`

const InvoiceDate = styled.p`
  font-size: 15px;
  font-weight: 700;
  text-transform: capitalize;
  color: ${props => props.theme.fontPriColor};
  transition: color .2s;
`

const BillToContainer = styled.div`
  grid-column: 3 / 4;
`

const BillToTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${props => props.theme.fontSecColor};
  margin-bottom: 12px;
  transition: color .2s;
`

const BillToName = styled.p`
  font-size: 15px;
  font-weight: 700;
  text-transform: capitalize;
  color: ${props => props.theme.fontPriColor};
  margin-bottom: 14px;
  transition: color .2s;
` 

const EmailContainer = styled.div`
  grid-column: 1 / 6;
`
const EmailTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${props => props.theme.fontSecColor};
  margin-bottom: 12px;
  transition: color .2s;
`

const Email = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.fontPriColor};
  transition: color .2s;
`

export default function ViewInvoiceBody({ invoice }) {
  return (
    <Container>
      <IdContainer>
        <InvoiceId>{invoice.id}</InvoiceId>
        <InvoiceDesc>{invoice.description}</InvoiceDesc>
      </IdContainer>
      <AddressContainer>
        <AddressTxt>{invoice.senderAddress.street}</AddressTxt>
        <AddressTxt>{invoice.senderAddress.city}</AddressTxt>
        <AddressTxt>{invoice.senderAddress.postCode}</AddressTxt>
        <AddressTxt>{invoice.senderAddress.country}</AddressTxt>
      </AddressContainer>
      <InvoiceDateContainer>
        <div>
          <InvoiceDateTitle>Invoice Date</InvoiceDateTitle>
          <InvoiceDate>{formatDate(invoice.createdAt)}</InvoiceDate>
        </div>
        <div>
          <InvoiceDateTitle>Payment Due</InvoiceDateTitle>
          <InvoiceDate>{formatDate(invoice.paymentDue)}</InvoiceDate>
        </div>
      </InvoiceDateContainer>
      <BillToContainer>
        <BillToTitle>Bill To</BillToTitle>
        <BillToName>{invoice.clientName}</BillToName>
        <AddressTxt>{invoice.clientAddress.street}</AddressTxt>
        <AddressTxt>{invoice.clientAddress.city}</AddressTxt>
        <AddressTxt>{invoice.clientAddress.postCode}</AddressTxt>
        <AddressTxt>{invoice.clientAddress.country}</AddressTxt>
      </BillToContainer>
      <EmailContainer>
        <EmailTitle>Sent to</EmailTitle>
        <Email>{invoice.clientEmail}</Email>
      </EmailContainer>
      <ViewInvoiceItemList items={invoice.items} />
    </Container>
  );
}