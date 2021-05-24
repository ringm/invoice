import React from 'react'
import styled from 'styled-components';
import SubNav from '../common/SubNav';
import FormInput from '../common/FormInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const EditFormHeader = styled.div`
  width: min(90%, 730px);
  display: flex;
  align-items: flex-start;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.fontPriColor};
`

const FormContainer = styled.div`
  width: min(90%, 730px);
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
`

const FieldSet = styled.fieldset`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-template-areas: 
    "legend legend"
    "street street"
    "city postCode"
    "country country";
`

const Legend = styled.legend`
  grid-area: ${props => props.area};
  font-weight: 700;
  font-size: 12px;
  color: #7C5DFA;
  margin-bottom: 20px;
`

export default function EditInvoice({ invoice, onChange }) {
  return (
    <Container>
      <SubNav linkTo={`/invoices/${invoice.id}`}  label={'Go back'} />
      <EditFormHeader>
        <Title>Edit <span style={{color: '#777F98'}}>#</span>{invoice.id}</Title>
      </EditFormHeader>
      <FormContainer>
        <form>
          <FieldSet>
            <Legend area={"legend"}>Bill From</Legend>
            <FormInput area={"street"} type={'text'} name='senderAddress' label={'Street Address'} value={invoice.senderAddress.street} onChange={onChange} />
            <FormInput area={"city"} type={'text'} name='senderCity' label={'City'} value={invoice.senderAddress.city} onChange={onChange} />
            <FormInput area={"postCode"} type={'text'} name='senderPostCode' label={'Post Code'} value={invoice.senderAddress.postCode} onChange={onChange} />
          </FieldSet>
        </form>
      </FormContainer>
    </Container>
  )
}
