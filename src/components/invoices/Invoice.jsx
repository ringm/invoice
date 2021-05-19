import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate, formatMoney } from "../../helpers";
import StatusPill from "../common/StatusPill";

const Container = styled.div`
  background-color: ${(props) => props.theme.invoiceBg};
  border-radius: 8px;
  padding: 25px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-template-rows: auto 30px auto auto;
  transition: background-color 0.2s;

  @media (min-width: 768px) {
    justify-content: space-between;
    grid-template-columns: 75px 120px 130px minmax(100px, max-content) 105px 5px;
    grid-template-rows: auto;
    align-items: center;
    justify-items: start;
  }
`;

const Id = styled.p`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: ${(props) => props.theme.fontPriColor};
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  transition: color 0.2s;

  &::before {
    content: "#";
    color: ${(props) => props.theme.fontSecColor};
    transition: color 0.2s;
  }

  @media (min-width: 768px) {
    grid-column: 1 / 2;
  }
`;

const PaymentDue = styled.p`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  color: ${(props) => props.theme.fontSecColor};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  transition: color 0.2s;

  @media (min-width: 768px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: start;
    margin-bottom: 0;
  }
`;

const ClientName = styled.p`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  justify-self: end;
  color: ${(props) => props.theme.fontSecColor};
  font-size: 12px;
  font-weight: 500;
  transition: color 0.2s;

  @media (min-width: 768px) {
    grid-column: 3 / 4;
    justify-self: start;
  }
`;

const Total = styled.p`
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  color: ${(props) => props.theme.fontPriColor};
  font-size: 16px;
  font-weight: 700;
  transition: color 0.2s;

  &::before {
    content: "£ ";
  }

  @media (min-width: 768px) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
    justify-self: end;
  }
`;

const Arrow = styled.svg`
  width: 7px;
  height: 11px;
  display: none;

  @media (min-width: 768px) {
    grid-column: 6 / 7;
    grid-row: 1 / 2;
    display: inline-block;
    justify-self: center;
    cursor: pointer;
  }
`;

export default function Invoice({ invoice, onInvoiceSelect }) {
  const total = invoice.items
    .reduce((acc, curr) => curr.total + acc, 0)
    .toFixed(2);

  return (
    <Container>
      <Id>{invoice.id}</Id>
      <PaymentDue>Due {formatDate(invoice.paymentDue)}</PaymentDue>
      <ClientName>{invoice.clientName}</ClientName>
      <Total>{formatMoney(total)}</Total>
      <StatusPill status={invoice.status} />
      <Link
        to={`/invoices/${invoice.id}`}
        onClick={() => onInvoiceSelect(invoice)}
      >
        <Arrow xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1l4 4-4 4"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </Arrow>
      </Link>
    </Container>
  );
}
