import React, { useState } from "react";
import styled from "styled-components";
import SubNav from "../common/SubNav";
import ViewInvoiceHeader from "./ViewInvoiceHeader";
import ViewInvoiceBody from "./ViewInvoiceBody";
import ViewInvoiceFooter from "./ViewInvoiceFooter";
import DeleteModal from "../common/DeleteModal";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 20px;
  justify-items: center;
  margin-top: 100px;
`;

export default function ViewInvoice({
  invoice,
  deviceWidth,
  onInvoiceDelete,
  onStatusChange
}) {
  const [modalVisibility, setModalVisibility] = useState(false);

  function handleModalVisibility() {
    setModalVisibility(!modalVisibility);
  }

  return (
    <Container>
      {modalVisibility && (
        <DeleteModal
          id={invoice.id}
          visibility={modalVisibility}
          onInvoiceDelete={onInvoiceDelete}
          onModalVisibilityChange={handleModalVisibility}
        />
      )}
      <SubNav linkTo={"/invoices"} label={"Go back"} />
      <ViewInvoiceHeader
        invoice={invoice}
        deviceWidth={deviceWidth}
        onModalVisibilityChange={handleModalVisibility}
        onStatusChange={onStatusChange}
      />
      <ViewInvoiceBody invoice={invoice} />
      {deviceWidth < 768 ? (
        <ViewInvoiceFooter
          invoice={invoice}
          onModalVisibilityChange={handleModalVisibility}
          onStatusChange={onStatusChange}
        />
      ) : null}
    </Container>
  );
}
