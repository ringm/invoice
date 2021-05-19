import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 20px;
  justify-items: center;
  margin-top: 100px;
  margin-bottom: 60px;
`

export default function ViewInvoice(props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}
