import React from "react";

import ExportCSV from './ExportCSV';


const CSVData=()=> {

  const fileName = 'Student_Details'

  const viewers = [

    {id:1,name:'vishal',age:'23',mobileno:'9988445566'},

    {id:2,name:'Vikas',age:'24',mobileno:'2233445566'},

    {id:1,name:'varad',age:'21',mobileno:'2200998833'},

    {id:2,name:'Virat',age:'27',mobileno:'2324463344'}

  ]

  const style={
      color:"green"
  }
  return (

    <div>
        <h3 style={style}>***Export your data as Excel file***</h3>

     <ExportCSV csvData={viewers} fileName={fileName} />

  </div>

  );

}

export default CSVData;
