import React from "react";
import styled from "styled-components";
import StatusPill from "../common/StatusPill";
import { Button } from "../common/Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: min(90%, 730px);
  height: 90px;
  background-color: ${(props) => props.theme.invoiceBg};
  border-radius: 8px;
  transition: background-color 0.2s;
`;

const HeaderTitle = styled.p`
  color: ${(props) => props.theme.fontSecColor};
  font-weight: 500;
  font-size: 12px;
  transition: color 0.2s;
`;

export default function ViewInvoiceHeader({ invoice, deviceWidth }) {
  return (
    <Container>
      <HeaderTitle>Status</HeaderTitle>
      <StatusPill status={invoice.status} />
      {deviceWidth >= 768 ? (
        <div>
          <Button bg={"#252945"} color={"#fff"}>
            Edit
          </Button>
          <Button bg={"#EC5757"} color={"#fff"}>
            Delete
          </Button>
          <Button bg={"#7C5DFA"} color={"#fff"}>
            Mark as Paid
          </Button>
        </div>
      ) : null}
    </Container>
  );
}
