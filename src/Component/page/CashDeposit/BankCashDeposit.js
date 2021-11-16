import React, { useState } from 'react';

// import '../../../css/ag-grid-customization01.css';
// import 'antd/dist/antd.css';
// import '../Settings/General/formfromold.css'
// import './cashoperations.css'
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const BankCashDeposit = () => {
  const [greeting, setGreeting] = useState(
    'Hello Cash Depost Wallet component!'
  );
 
  const handleChange = event => setGreeting(event.target.value);
 
  return (
    <div>
      <h1>{greeting}</h1>
 
      <input type="text" value={greeting} onChange={handleChange} />
    </div>
  );
};
 
export default BankCashDeposit;