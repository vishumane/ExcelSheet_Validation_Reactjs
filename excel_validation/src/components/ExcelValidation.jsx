
import React,{useState} from 'react';
import * as XLSX from 'xlsx';
import '../App.css';

 const ExcelValidation=()=>{

const[items,setItems]=useState([]);
const [formatedError,setformatedError] = useState('');

//Masks
const INTEGER = "An Integer value";
const _isInteger = { mask: /^[0-9]*$/ };

const PHONE = "A standard  10 digit phone number (I.e. 123-456-7890)";
const _isPhone = { mask: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/ };

const DECIMAL = "A decimal format (I.e. 1234.10 or 1234)";
const _isDecimal = { mask: /^\d*(\.\d+)?$/ };

const TEXT = " Only alphabets are allowed for this field "
const _isText= { mask:/^[aA-zZ\s]+$/};

const EMAIL="please enter valid email ID "
const _isEmail= {mask:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i};


//Validations
const validAge = (row, element, errors) => {
  const COLUMN = "Age";
  let validAge = _isInteger.mask.test(element[COLUMN]);
  if (!validAge) {
    let rowError = row + 2;
    errors.push({
      row: rowError,
      column: COLUMN,
      type: INTEGER,
      value: element[COLUMN]
    });
  }
};
const validPhone = (row, element, errors) => {
  const COLUMN = "Phone";
  let validPhone = _isPhone.mask.test(element[COLUMN]);
  if (!validPhone) {
    let rowError = row + 2;
    errors.push({
      row: rowError,
      column: COLUMN,
      type: PHONE,
      value: element[COLUMN]
    });
  }
};
const validScore = (row, element, errors) => {
  const COLUMN = "Score";
  let validScore = _isDecimal.mask.test(element[COLUMN]);
  if (!validScore) {
    let rowError = row + 2;
    errors.push({
      row: rowError,
      column: COLUMN,
      type: DECIMAL,
      value: element[COLUMN]
    });
  }
};
const validateText = (row, element, errors) => {
    const COLUMN = "Text";
    let validateText = _isText.mask.test(element[COLUMN]);
    if (!validateText) {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        type: TEXT,
        value: element[COLUMN]
      });
    }
  };

  const validateEmail = (row, element, errors) => {
    const COLUMN = "Email";
    let validateEmail = _isEmail.mask.test(element[COLUMN]);
    if (!validateEmail) {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        type: EMAIL,
        value: element[COLUMN]
      });
    }
  };

//   const validateColumn=(row,element,errors)=>{
//     const COLUMN = ["Age","Phone","Score","Text","Email"];
//     for(let i=0;i<COLUMN.length;i++)
//     {
//     }
//   }

const validateExcel = (rows) => {
    let errors = [];
    if(rows){
  for (let i = 0; i < rows.length; i++) {
    let element = rows[i];
    validAge(i, element, errors);
    validPhone(i, element, errors);
    validScore(i, element, errors);
    validateText(i,element,errors);
    validateEmail(i,element,errors);
    // validateColumn(i,element,errors);
  }
  }
  return errors;
};
const readExcel=(file)=>{
    const promise=new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload=(e)=>{
            const bufferArray=e.target.result;
            const wb=XLSX.read(bufferArray,{type:'buffer'});
            const wsname=wb.SheetNames[0];
            const ws=wb.Sheets[wsname];
            const data=XLSX.utils.sheet_to_json(ws,{
                blankRows: false});

            resolve(data);
        };
        fileReader.onerror=(error)=>{
            reject(error);
        };
    });
    promise.then((data)=>{
        console.log(data);
        setItems(data);
        const errors = validateExcel(data);
        var allErrorFun=allErrors(errors);
        setformatedError(allErrorFun)
           console.log("all errors are",allErrorFun);
    })
    };
const allErrors= (errors)=>{
    let formatedError = "";

    if (errors.length > 0) {
formatedError = formatedError.concat('Errors:');
errors.forEach((error) => {
  console.log("erroe tyeop",error.row);
  formatedError = formatedError.concat(`

    [Line|column] :  [${error.row}|${error.column}]
    With Value: ${error.value}
    Needs: ${error.type}`);
//   formatedError.concat("</ul>");
console.log("error type",errors);
});
}
else {
formatedError = formatedError.concat(` ¡Successful validation!`);
}
formatedError.concat("</lu>");
console.log(formatedError);
return formatedError;
}

const style={
  color:"orange"
}
return (

    <div>
        <h3 style={style}>*****bulk upload file with validation*****</h3>
        <input type="file" onChange={(e)=>{
                const file=e.target.files[0];
                readExcel(file);
            }}
            />
         <table class="table">
                <thead>
                    <tr>
                        <th scope="col">age </th><br></br>
                        <th scope="col">phone</th><br></br>
                        <th scope="col">Score</th><br></br>
                        <th scope="col">Text</th><br></br>
                        <th scope="col">Email</th><br></br>
                    </tr>
                </thead>
                <tbody>
                    {items.map((d) => (
                        <tr key={d.age}>
                            <th>{d.Age}</th><br></br>
                            <td>{d.Phone}</td><br></br>
                            <td>{d.Score}</td><br></br>
                            <td>{d.Text}</td><br></br>
                            <td>{d.Email}</td><br></br>
                        </tr>
                    ))}
                </tbody>
            </table>
          <p>{formatedError}</p>
    <div className='errorMsg'>*all error message*</div>
    </div>
)
}
export default ExcelValidation;