import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from './theme';
import { invoiceData } from './data';
import NavBar from './components/NavBar';
import Invoices from './components/invoices/Invoices';
import InvoiceHeader from './components/invoices/InvoiceHeader';
import InvoiceList from './components/invoices/InvoiceList';
import Invoice from './components/invoices/Invoice';
import NoInvoices from './components/invoices/NoInvoices';
import ViewInvoice from './components/viewInvoice/ViewInvoice';
import ViewInvoiceNav from './components/viewInvoice/ViewInvoiceNav';
import ViewInvoiceHeader from './components/viewInvoice/ViewInvoiceHeader';
import ViewInvoiceBody from './components/viewInvoice/ViewInvoiceBody';

function App() { 

  const [theme, setTheme] = useState('dark');
  const [invoices, setInvoices] = useState(invoiceData);
  const [selectedInvoice, setSelectedInvoice] = useState(invoiceData[3])

  function handleThemeToggle() {
    theme === 'light' ? setTheme('dark') : setTheme('light'); 
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <NavBar onThemeToggle={handleThemeToggle} />
      {/*<Invoices>
        <InvoiceHeader count={invoices.length} />
        {invoices.length === 0 ? <NoInvoices /> : 
          <InvoiceList>
            {invoices.map(invoice => <Invoice key={invoice.id} invoice={invoice} />)}
          </InvoiceList>
        }
      </Invoices>*/}
      <ViewInvoice>
        <ViewInvoiceNav />
        <ViewInvoiceHeader invoice={selectedInvoice} />
        <ViewInvoiceBody invoice={selectedInvoice} />
      </ViewInvoice>
    </ThemeProvider>
  );
}

export default App;
