import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";
import { invoiceData } from "./data";
import NavBar from "./components/NavBar";
import Invoices from "./components/invoices/Invoices";
import ViewInvoice from "./components/viewInvoice/ViewInvoice";

function App() {
  const [theme, setTheme] = useState("dark");
  const [invoices, setInvoices] = useState(invoiceData);
  const [selectedInvoice, setSelectedInvoice] = useState({});

  function handleThemeToggle() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  function handleInvoiceSelect(invoice) {
    setSelectedInvoice(invoice);
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <NavBar onThemeToggle={handleThemeToggle} />
      <Switch>
        <Route
          path="/invoices/:id"
          render={() => <ViewInvoice invoice={selectedInvoice} />}
        />
        <Route
          path="/invoices"
          render={() => (
            <Invoices
              invoices={invoices}
              onInvoiceSelect={handleInvoiceSelect}
            />
          )}
        />
        <Route path="/" exact render={() => <Invoices invoices={invoices} />} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
