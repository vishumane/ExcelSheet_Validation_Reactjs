import React from'react';
 import ExcelValidation from'./components/ExcelValidation';
 import SearchFilter from'./components/Searchfilter/SearchFilter';
const App=()=> {
  return (
    <div className="App">
      <ExcelValidation/>
      <SearchFilter/>
    </div>
  );
}

export default App;
