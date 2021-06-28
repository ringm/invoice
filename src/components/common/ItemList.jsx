import React from "react";
import styled from "styled-components";
import Item from "../common/Item";
import { Button } from "../common/Button";

const StyledDiv = styled.div`
  grid-area: ${(props) => props.area};
  display: grid;
  grid-row-gap: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #777f98;
  margin-bottom: 0;
`;

export default function ItemList({ items, onItemListChange, area, errors }) {
  function handleItemsChange(item, idx) {
    const newItems = [...items];
    newItems[idx] = item;
    newItems[idx].total = newItems[idx].quantity * newItems[idx].price;
    onItemListChange(newItems);
  }

  function handleAddItem(e) {
    e.preventDefault();
    const newItem = {
      name: "",
      quantity: 1,
      price: 1,
      total: 1
    };
    onItemListChange([...items, newItem]);
  }

  function handleRemoveItem(idx) {
    const currentList = [...items];
    currentList.splice(idx, 1);
    onItemListChange(currentList);
  }

  return (
    <StyledDiv area={area}>
      <Title>Item List</Title>
      {items.map((item, idx) => (
        <Item
          key={idx}
          item={item}
          onItemsChange={handleItemsChange}
          onItemDelete={handleRemoveItem}
          idx={idx}
          error={errors ? errors[idx] : null}
        />
      ))}
      <Button
        bg={"#252945"}
        color={"#888EB0"}
        fullWidth
        onClick={(e) => handleAddItem(e)}
      >
        Add New Item
      </Button>
    </StyledDiv>
  );
}
