import React from "react";
import styled from "styled-components";
import ViewInvoiceNav from "./ViewInvoiceNav";
import ViewInvoiceHeader from "./ViewInvoiceHeader";
import ViewInvoiceBody from "./ViewInvoiceBody";
import ViewInvoiceFooter from "./ViewInvoiceFooter";
import UseWindowDimension from "../common/UseWindowDimension";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 20px;
  justify-items: center;
  margin-top: 100px;
`;

export default function ViewInvoice({ invoice }) {
  const { width: deviceWidth } = UseWindowDimension();
  return (
    <Container>
      <ViewInvoiceNav />
      <ViewInvoiceHeader invoice={invoice} deviceWidth={deviceWidth} />
      <ViewInvoiceBody invoice={invoice} />
      {deviceWidth < 768 ? <ViewInvoiceFooter /> : null}
    </Container>
  );
}
