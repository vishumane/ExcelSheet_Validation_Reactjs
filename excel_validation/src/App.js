import React from'react';
 import ExcelValidation from'./components/ExcelValidation';
 import SearchFilter from'./components/Searchfilter/SearchFilter';
 import Otpverifcation from'./components/OTPVerify/Otpverifcation';
const App=()=> {
  return (
    <div className="App">
      <ExcelValidation/>
      <SearchFilter/>
      <Otpverifcation/>
    </div>
  );
}

export default App;
