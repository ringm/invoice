import React from "react";
import styled from "styled-components";
import FormInput from "./FormInput";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.2fr 0.35fr 0.35fr 0.2fr;
  grid-gap: 20px;
  grid-template-areas:
    "name name name name"
    "qty price total delete";

  @media (min-width: 768px) {
    grid-template-columns: 0.45fr 0.15fr 0.15fr 0.15fr 0.1fr;
    grid-template-areas: "name qty price total delete";
  }
`;

const IconContainer = styled.div`
  grid-area: ${(props) => props.area};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteIcon = styled.svg`
  width: 13px;
  height: 16px;
  cursor: pointer;
  transform: translateY(10px);
`;

export default function Item({
  item,
  onItemsChange,
  idx,
  onItemDelete,
  error
}) {
  function handleItemChange(e, name) {
    const newItem = { ...item };
    newItem[name] = e.currentTarget.value;
    onItemsChange(newItem, idx);
  }

  return (
    <Container>
      <FormInput
        area={"name"}
        type={"text"}
        name={"name"}
        label={"Item Name"}
        value={item.name}
        onChange={handleItemChange}
        error={error?.name}
      />
      <FormInput
        area={"qty"}
        type={"number"}
        name={"quantity"}
        label={"Qty."}
        value={item.quantity}
        onChange={handleItemChange}
        error={error?.quantity}
      />
      <FormInput
        area={"price"}
        type={"text"}
        name={"price"}
        label={"Price"}
        value={item.price}
        onChange={handleItemChange}
        error={error?.price}
      />
      <FormInput
        area={"total"}
        type={"text"}
        name={"total"}
        label={"Total"}
        value={item.total}
        onChange={handleItemChange}
        error={error?.total}
        noBg
      />
      <IconContainer onClick={() => onItemDelete(idx)}>
        <DeleteIcon>
          <path
            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            fill="#888EB0"
            fillRule="nonzero"
          />
        </DeleteIcon>
      </IconContainer>
    </Container>
  );
}
