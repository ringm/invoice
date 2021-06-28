import styled from "styled-components";

const StyledSpan = styled.span`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export default function Span({ txt }) {
  return <StyledSpan>{txt}</StyledSpan>;
}
