import React from 'react';
import styled from 'styled-components';

const InputGroup = styled.div`
  grid-area: ${props => props.area};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Label = styled.label`
  color: ${props => props.theme.fontSecColor};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  text-transform: capitalize;
`

const Input = styled.input`
  width: 100%;
  font-family: 'Spartan';
  background-color: ${props => props.theme.themeName === 'light' ? '#fff' : '#1E2139'};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.themeName === 'light' ? '#DFE3FA' : '#252945'};
  padding: 10px;
  color: ${props => props.theme.themeName === 'light' ? '#0C0E16': '#fff'};
  font-weight: 700;
  font-size: 12px;
`

export default function FormInput({ name, label, value, area, type, onChange }) {
  return (
    <InputGroup area={area}>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} id={name} name={name} value={value} onChange={() => onChange()}></Input>
    </InputGroup>
  )
}
