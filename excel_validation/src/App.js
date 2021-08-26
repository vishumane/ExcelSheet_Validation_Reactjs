import React from'react';
 import ExcelValidation from'./components/ExcelValidation';
 import SearchFilter from'./components/Searchfilter/SearchFilter';
 import Otpverifcation from'./components/OTPVerify/Otpverifcation';
 import CSVData from'./components/ExportCSV/CSVData';
const App=()=> {
  return (
    <div className="App">
      <ExcelValidation/>
      <SearchFilter/>
      <Otpverifcation/>
      <CSVData/>
    </div>
  );
}

export default App;
