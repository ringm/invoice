import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";

const Container = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MsgBox = styled.div`
  background-color: ${(props) =>
    props.theme.themeName === "light" ? "#fff" : "#1E2139"};
  border-radius: 8px;
  padding: 25px;
`;

const Msg = styled.p`
  color: ${(props) => (props.theme.themeName === "light" ? "#0C0E16" : "#fff")};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 25px;
`;

export default function DeleteModal({
  id,
  onModalVisibilityChange,
  onInvoiceDelete
}) {
  return (
    <Container>
      <MsgBox>
        <Msg>Are you sure you want to delete this invoice?</Msg>
        <ButtonContainer>
          <Button onClick={onModalVisibilityChange}>Cancel</Button>
          <Link to={"/invoices/"} onClick={() => onInvoiceDelete(id)}>
            <Button bg={"#EC5757"} color={"#fff"}>
              Delete
            </Button>
          </Link>
        </ButtonContainer>
      </MsgBox>
    </Container>
  );
}
