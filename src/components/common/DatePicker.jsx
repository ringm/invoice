import React from "react";
import { createGlobalStyle } from "styled-components";
import { DateSingleInput } from "@datepicker-react/styled";
import styled, { ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .sc-fXazdy.bShsOz {
    margin: 0;
  }

  /* reset button */
  .sc-FRrlG.hOKXJB {
    display: none;
  }

  /* week days */
  .sc-eKYRIR.vqxTL > div:nth-child(2) {
    display: none;
  }

  button[aria-label="Next month"],
  button[aria-label="Previous month"] {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  grid-area: ${(props) => props.area};
`;

const StyledLabel = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontSecColor};
`;

export default function DatePicker({
  area,
  date,
  value,
  onDateChange,
  onFocusChange
}) {
  return (
    <StyledDiv area={area}>
      <GlobalStyle />
      <ThemeProvider
        theme={{
          breakpoints: ["32em", "48em", "64em"],
          reactDatepicker: {
            daySize: [36, 40],
            fontFamily: "Spartan",
            colors: {
              accessibility: "#D80249",
              selectedDay: "#fff",
              selectedDayHover: "#F75D95",
              primaryColor: "transparent"
            },
            datepickerPadding: "18px",
            datepickerBorderRadius: "8px",
            datepickerBoxShadow:
              "box-shadow: -1px 10px 21px 0px rgba(0,0,0,0.26);",
            datepickerBackground: "#252945",
            datepickerCloseWrapperDisplay: "none",
            dayBackground: "transparent",
            daySelectedBackground: "transparent",
            dayColor: "#DFE3FA",
            dayFontWeight: "bold",
            dayBorderColor: "transparent",
            dayLabelColor: "#DFE3FA",
            dayLabelFontWeight: "bold",
            monthLabelFontWeight: "bold",
            monthLabelFontSize: "12px",
            monthLabelColor: "#DFE3FA",
            dayHoverColor: "#7C5DFA",
            dayHoverBackground: "transparent",
            daySelectedBorderColor: "transparent",
            navButtonIconColor: "#7C5DFA",
            inputLabelBorder: "none",
            inputLabelDisplay: "block",
            inputBackground: "#1E2139",
            inputPlaceholderColor: "#fff",
            inputBorder: "1px solid #252945",
            inputFontSize: "12px",
            inputColor: "#fff",
            inputCalendarIconColor: "#7E88C3",
            inputCalendarWrapperPosition: "absolute",
            inputCalendarWrapperLeft: "unset",
            inputCalendarWrapperRight: "16px",
            inputPadding: "15px",
            selectDateBorderColor: "transparent",
            inputMinHeight: "48px"
          }
        }}
      >
        <StyledLabel>Invoice Date</StyledLabel>
        <DateSingleInput
          onDateChange={(data) =>
            onDateChange({ type: "dateChange", payload: data })
          }
          onFocusChange={(focusedInput) =>
            onFocusChange({ type: "focusChange", payload: focusedInput })
          }
          date={value} // Date or null
          showDatepicker={date.showDatepicker} // Boolean
        />
      </ThemeProvider>
    </StyledDiv>
  );
}
