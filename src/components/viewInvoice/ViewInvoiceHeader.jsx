import React from "react";
import styled from "styled-components";
import StatusPill from "../common/StatusPill";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
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
export default function ViewInvoiceHeader({ invoice }) {
  return (
    <Container>
      <HeaderTitle>Status</HeaderTitle>
      <StatusPill status={invoice.status} />
    </Container>
  );
}
