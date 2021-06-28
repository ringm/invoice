import React, { useState, useEffect, useReducer } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import _ from "lodash";
import Joi from "joi-browser";
import { dateToDatabase, addDays } from "../../helpers";
import SubNav from "../common/SubNav";
import FormInput from "../common/FormInput";
import SelectInput from "../common/SelectInput";
import DatePicker from "../common/DatePicker";
import ItemList from "../common/ItemList";
import CreateModal from "../common/CreateModal";
import { Button } from "../common/Button";

const Container = styled.div`
  display: flex;
  overflow-y: hidden;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const EditFormHeader = styled.div`
  width: min(90%, 730px);
  display: flex;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.fontPriColor};
`;

const FormContainer = styled.div`
  width: min(90%, 730px);
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
`;

const FieldSet = styled.fieldset`
  width: 100%;

  & + & {
    margin-top: 20px;
  }
`;

const Legend = styled.legend`
  grid-area: ${(props) => props.area};
  font-weight: 700;
  font-size: 12px;
  color: #7c5dfa;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  grid-template-areas:
    "legend legend"
    "street street"
    "city postCode"
    "country country";

  ${(props) =>
    props.grid === "billTo" &&
    css`
      grid-template-areas:
        "legend legend"
        "clientName clientName"
        "clientEmail clientEmail"
        "street street"
        "city postCode"
        "country country"
        "invoiceDate invoiceDate"
        "payment payment"
        "desc desc"
        "itemList itemList";
    `}

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "legend legend legend"
      "street street street"
      "city postCode country";

    ${(props) =>
      props.grid === "billTo" &&
      css`
        grid-template-columns: repeat(6, 1fr);
        grid-template-areas:
          "legend legend legend legend legend legend"
          "clientName clientName clientName clientName clientName clientName"
          "clientEmail clientEmail clientEmail clientEmail clientEmail clientEmail"
          "street street street street street street"
          "city city postCode postCode country country"
          "invoiceDate invoiceDate invoiceDate payment payment payment"
          "desc desc desc desc desc desc"
          "itemList itemList itemList itemList itemList itemList";
      `}
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #1e2139;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
`;

function handleSubmit(e) {
  e.preventDefault();
}

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, showDatepicker: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

export default function EditInvoice({
  title,
  invoice,
  onSave,
  history,
  match
}) {
  const [editedInvoice, setEditedInvoice] = useState(_.cloneDeep(invoice));
  const [errors, setErrors] = useState({});
  const [dueDate, setDueDate] = useState(15);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    date: new Date(invoice.createdAt),
    showDatepicker: false
  });

  const schema = {
    id: Joi.string().required(),
    createdAt: Joi.string().required(),
    paymentDue: Joi.string().required(),
    description: Joi.string().required().label("Description"),
    clientName: Joi.string().required().label("Client's Name"),
    clientEmail: Joi.string().email().required().label("Client's Email"),
    status: Joi.string().required(),
    paymentTerms: Joi.number().required(),
    senderAddress: Joi.object({
      street: Joi.string().required().label("Street"),
      city: Joi.string().required().label("City"),
      postCode: Joi.string().required().label("Post Code"),
      country: Joi.string().required().label("Country")
    }),
    clientAddress: Joi.object({
      street: Joi.string().required().label("Client's street"),
      city: Joi.string().required().label("Client's city"),
      postCode: Joi.string().required().label("Client's post code"),
      country: Joi.string().required().label("Client's country")
    }),
    items: Joi.array().items(
      Joi.object({
        name: Joi.string().required().label("Item name"),
        quantity: Joi.number().required(),
        price: Joi.number().required().label("Item price"),
        total: Joi.number().required()
      })
    ),
    total: Joi.number().required()
  };

  useEffect(() => {
    if (match.path === "/invoices/new/:id") {
      const currentInvoice = { ...editedInvoice };
      currentInvoice.id = match.params.id;
      setEditedInvoice(currentInvoice);
    }
  }, []);

  function handleModalVisibility() {
    const errs = validate();
    if (errs === null) setModalVisibility(!modalVisibility);
  }

  function validate() {
    const result = Joi.validate(editedInvoice, schema, { abortEarly: false });
    if (!result.error) return null;
    const err = {};
    result.error.details.map((e) => {
      if (e.path.length === 1) {
        return (err[e.path[0]] = e.message);
      } else if (e.path.length === 2) {
        return (err[e.path[0]] = { ...err[e.path[0]], [e.path[1]]: e.message });
      } else {
        return (err[e.path[0]] = [err[e.path[0]], { [e.path[2]]: e.message }]);
      }
    });
    setErrors(err);
    return err;
  }

  function handleChange(e, property) {
    const newInvoice = _.cloneDeep(editedInvoice);
    _.set(newInvoice, property, e.currentTarget.value);
    setEditedInvoice(newInvoice);
  }

  function handleDateChange(obj) {
    const newInvoice = _.cloneDeep(editedInvoice);
    _.set(newInvoice, "createdAt", dateToDatabase(obj.payload.date));
    const paymentDue = addDays(obj.payload.date, dueDate);
    _.set(newInvoice, "paymentDue", dateToDatabase(paymentDue));
    dispatch(obj);
    setEditedInvoice(newInvoice);
  }

  function handleDateEndChange(days) {
    setDueDate(parseInt(days));
    if (state.date === null) return;
    const newInvoice = _.cloneDeep(editedInvoice);
    const startDate = state.date;
    const dueDate = addDays(startDate, parseInt(days));
    _.set(newInvoice, "paymentDue", dateToDatabase(dueDate));
    setEditedInvoice(newInvoice);
  }

  function handleFocusChange(obj) {
    dispatch(obj);
  }

  function handleItemListChange(itemList) {
    const newInvoice = _.cloneDeep(editedInvoice);
    newInvoice.items = itemList;
    newInvoice.total = itemList.reduce(
      (acc, curr) => parseInt(curr.total) + acc,
      0
    );
    setEditedInvoice(newInvoice);
  }

  function handleSave(invoice) {
    const url =
      match.path === "/invoices/new/:id"
        ? "/invoices/"
        : `/invoices/${invoice.id}`;
    onSave(invoice);
    history.replace(url);
  }

  return (
    <Container>
      {modalVisibility && (
        <CreateModal
          url={match.path}
          invoice={editedInvoice}
          onInvoiceSave={handleSave}
          onModalVisibilityChange={handleModalVisibility}
        />
      )}
      <SubNav
        linkTo={
          match.path === "/invoices/new/:id"
            ? "/invoices/"
            : `/invoices/${editedInvoice.id}`
        }
        label={"Go back"}
      />
      <EditFormHeader>
        <Title>
          {title} <span style={{ color: "#777F98" }}>#</span>
          {editedInvoice.id}
        </Title>
      </EditFormHeader>
      <FormContainer>
        <form onSubmit={() => handleSubmit()}>
          <FieldSet>
            <StyledDiv>
              <Legend area={"legend"}>Bill From</Legend>
              <FormInput
                area={"street"}
                type={"text"}
                name="senderAddress.street"
                label={"Street Address"}
                value={editedInvoice.senderAddress.street}
                error={errors?.senderAddress?.street}
                onChange={handleChange}
              />
              <FormInput
                area={"city"}
                type={"text"}
                name="senderAddress.city"
                label={"City"}
                value={editedInvoice.senderAddress.city}
                error={errors?.senderAddress?.city}
                onChange={handleChange}
              />
              <FormInput
                area={"postCode"}
                type={"text"}
                name="senderAddress.postCode"
                label={"Post Code"}
                value={editedInvoice.senderAddress.postCode}
                error={errors?.senderAddress?.postCode}
                onChange={handleChange}
              />
              <FormInput
                area={"country"}
                type={"text"}
                name="senderAddress.country"
                label={"Country"}
                value={editedInvoice.senderAddress.country}
                error={errors?.senderAddress?.country}
                onChange={handleChange}
              />
            </StyledDiv>
          </FieldSet>
          <FieldSet>
            <StyledDiv grid={"billTo"}>
              <Legend area={"legend"}>Bill To</Legend>
              <FormInput
                area={"clientName"}
                type={"text"}
                name="clientName"
                label={"Client's Name"}
                error={errors.clientName}
                value={editedInvoice.clientName}
                onChange={handleChange}
              />
              <FormInput
                area={"clientEmail"}
                type={"email"}
                name="clientEmail"
                label={"Client's Email"}
                value={editedInvoice.clientEmail}
                error={errors.clientEmail}
                onChange={handleChange}
              />
              <FormInput
                area={"street"}
                type={"text"}
                name="clientAddress.street"
                label={"Street Address"}
                value={editedInvoice.clientAddress.street}
                error={errors?.clientAddress?.street}
                onChange={handleChange}
              />
              <FormInput
                area={"city"}
                type={"text"}
                name="clientAddress.city"
                label={"City"}
                value={editedInvoice.clientAddress.city}
                error={errors?.clientAddress?.city}
                onChange={handleChange}
              />
              <FormInput
                area={"postCode"}
                type={"text"}
                name="clientAddress.postCode"
                label={"Post Code"}
                value={editedInvoice.clientAddress.postCode}
                error={errors?.clientAddress?.postCode}
                onChange={handleChange}
              />
              <FormInput
                area={"country"}
                type={"text"}
                name="clientAddress.country"
                label={"Country"}
                value={editedInvoice.clientAddress.country}
                error={errors?.clientAddress?.country}
                onChange={handleChange}
              />
              <DatePicker
                area={"invoiceDate"}
                onDateChange={handleDateChange}
                onFocusChange={handleFocusChange}
                date={state}
                value={state.date}
              />
              <SelectInput
                area={"payment"}
                name="paymentTerms"
                label={"Payment Terms"}
                values={[15, 30, 60]}
                val={dueDate}
                onChange={handleDateEndChange}
              />
              <FormInput
                area={"desc"}
                type={"text"}
                name="description"
                label={"Project Description"}
                value={editedInvoice.description}
                error={errors.description}
                onChange={handleChange}
              />
              <ItemList
                area={"itemList"}
                items={editedInvoice.items}
                onItemListChange={handleItemListChange}
                errors={errors?.items}
              />
            </StyledDiv>
          </FieldSet>
        </form>
      </FormContainer>
      <ButtonsContainer>
        <Link
          to={
            match.path === "/invoices/new/:id"
              ? "/invoices/"
              : `/invoices/${editedInvoice.id}`
          }
        >
          <Button bg={"#252945"} color={"#FFF"}>
            Cancel
          </Button>
        </Link>
        <Button
          type="button"
          bg={"#7C5DFA"}
          color={"#FFF"}
          onClick={handleModalVisibility}
        >
          {match.path === "/invoices/new/:id"
            ? "Create Invoice"
            : `Save Changes`}
        </Button>
      </ButtonsContainer>
    </Container>
  );
}
