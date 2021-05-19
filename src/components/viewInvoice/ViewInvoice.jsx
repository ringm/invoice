import React from "react";
import styled from "styled-components";
import ViewInvoiceNav from "./ViewInvoiceNav";
import ViewInvoiceHeader from "./ViewInvoiceHeader";
import ViewInvoiceBody from "./ViewInvoiceBody";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 20px;
  justify-items: center;
  margin-top: 100px;
  margin-bottom: 60px;
`;

export default function ViewInvoice({ invoice }) {
  return (
    <Container>
      <ViewInvoiceNav />
      <ViewInvoiceHeader invoice={invoice} />
      <ViewInvoiceBody invoice={invoice} />
    </Container>
  );
}
