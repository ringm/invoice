import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";
import { invoiceData } from "./data";
import UseWindowDimension from "./components/common/UseWindowDimension";
import NavBar from "./components/NavBar";
import Invoices from "./components/invoices/Invoices";
import ViewInvoice from "./components/viewInvoice/ViewInvoice";
import EditInvoice from "./components/editInvoice/EditInvoice";

function App() {
  const [theme, setTheme] = useState("dark");
  const { width: deviceWidth } = UseWindowDimension();
  const [invoices, setInvoices] = useState(invoiceData);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [currentFilter, setCurrentFilter] = useState("");
  const filteredInvoices =
    currentFilter === ""
      ? invoices
      : invoices.filter((invoice) => invoice.status === currentFilter);

  function handleThemeToggle() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  function handleInvoiceSelect(invoice) {
    setSelectedInvoice(invoice);
  }

  function handleFilterSelect(filter) {
    const newFilter = filter === currentFilter ? "" : filter;
    setCurrentFilter(newFilter);
  }

  function handleSave(invoice) {
    const newInvoices = [...invoices];
    const index = newInvoices.findIndex(
      (newInvoice) => newInvoice.id === invoice.id
    );
    newInvoices[index] = invoice;
    setInvoices(newInvoices);
    setSelectedInvoice(invoice);
  }

  function handleInvoiceDelete(id) {
    const newInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(newInvoices);
  }

  function handleStatusChange(id, status) {
    const currentInvoices = [...invoices];
    const currentInvoice = invoices.find((invoice) => invoice.id === id);
    currentInvoice.status = status === "paid" ? "pending" : "paid";
    setInvoices(currentInvoices);
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <NavBar onThemeToggle={handleThemeToggle} />
      <Switch>
        <Route
          path="/invoices/edit/:id"
          render={(props) => (
            <EditInvoice
              invoice={selectedInvoice}
              onSave={handleSave}
              {...props}
            />
          )}
        />
        <Route
          path="/invoices/:id"
          render={() => (
            <ViewInvoice
              invoice={selectedInvoice}
              deviceWidth={deviceWidth}
              onStatusChange={handleStatusChange}
              onInvoiceDelete={handleInvoiceDelete}
            />
          )}
        />
        <Route
          path="/invoices"
          render={() => (
            <Invoices
              invoices={filteredInvoices}
              onInvoiceSelect={handleInvoiceSelect}
              onFilterSelect={handleFilterSelect}
              currentFilter={currentFilter}
            />
          )}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
