import styled, { css } from "styled-components";
import { formatDate } from "../../helpers";
import ViewInvoiceItemList from "./ViewInvoiceItemList";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 30px;
  padding: 30px 20px;
  width: min(90%, 730px);
  background-color: ${(props) => props.theme.invoiceBg};
  border-radius: 8px;
  transition: background-color 0.2s;
`;

const Col = styled.div`
  grid-column: 1 / 2;

  ${(props) =>
    props.right &&
    css`
      grid-column: 2 / 3;
    `}

  ${(props) =>
    props.stretch &&
    css`
      grid-column: 1 / 3;
    `}

  ${(props) =>
    props.flexCol &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const Data = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${(props) => props.theme.fontSecColor};
  transition: color 0.2s;

  & + & {
    margin-top: 8px;
  }

  ${(props) =>
    props.highlight &&
    css`
      font-size: 15px;
      font-weight: 700;
      color: ${(props) => props.theme.fontPriColor};
    `}

  ${(props) =>
    props.lowercase &&
    css`
      text-transform: lowercase;
    `}

    ${(props) =>
      props.id &&
      css`
        color: ${(props) => props.theme.fontPriColor};
        font-weight: bold;
        text-transform: uppercase;
        &::before {
          content: "#";
          color: #7e88c3;
        }
      `}
`;

export default function ViewInvoiceBody({ invoice }) {
  return (
    <Container>
      <Col>
        <Data id>{invoice.id}</Data>
        <Data>{invoice.description}</Data>
      </Col>
      <Col>
        <Data>{invoice.senderAddress.street}</Data>
        <Data>{invoice.senderAddress.city}</Data>
        <Data>{invoice.senderAddress.postCode}</Data>
        <Data>{invoice.senderAddress.country}</Data>
      </Col>
      <Col flexCol>
        <div>
          <Data>Invoice Date</Data>
          <Data highlight>{formatDate(invoice.createdAt)}</Data>
        </div>
        <div>
          <Data>Payment Due</Data>
          <Data highlight>{formatDate(invoice.paymentDue)}</Data>
        </div>
      </Col>
      <Col right>
        <Data>Bill To</Data>
        <Data highlight>{invoice.clientName}</Data>
        <Data>{invoice.clientAddress.street}</Data>
        <Data>{invoice.clientAddress.city}</Data>
        <Data>{invoice.clientAddress.postCode}</Data>
        <Data>{invoice.clientAddress.country}</Data>
      </Col>
      <Col stretch>
        <Data>Sent to</Data>
        <Data highlight lowercase>
          {invoice.clientEmail}
        </Data>
      </Col>
      <ViewInvoiceItemList items={invoice.items} />
    </Container>
  );
}
