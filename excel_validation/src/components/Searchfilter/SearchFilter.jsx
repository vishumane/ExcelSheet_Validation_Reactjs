import React,{useState,useEffect}from 'react';
import DataTable from'./DataTable';

 const SearchFilter=()=> {
     const [data,setData]=useState([]);
     const[q,setQ]=useState([]);
     const [searchcoloumns,setSearchColoumns]=useState(["title","id"])

     useEffect( ()=>{
        fetch('https://jsonplaceholder.typicode.com/todos/')
         .then(response => response.json())
            .then(json => setData(json));
     },[]);
     
    //  console.log(q);
const search=(rows)=>{
    // return rows.filter(row=>row.title.toLowerCase().indexOf(q)>-1)
    return rows.filter((row)=>
    searchcoloumns.some(
        (column)=>
        row[column].toString().toLowerCase().indexOf(q) > -1

       )
    );
}

const columns=data[0]&& Object.keys(data[0]);

const style={
    color:"brown"
}
    return (
        <div>
            <h3 style={style}>*****searching according to user choice****</h3>
            <input type="text" value={q} onChange={(e)=>setQ(e.target.value)}></input>
            {/* <DataTable data={data}/></DataTable> */}
            {columns&& columns.map((column)=><label>

                <input type="checkbox"
                checked={searchcoloumns.includes(column)}
                onChange={(e)=>{
                    const checked=searchcoloumns.includes(column);
                    setSearchColoumns((prev)=>
                    checked
                    ?
                    prev.filter((sc)=>sc!==column)
                    :[...prev,column]
                    );
                }}
                ></input>
                {column}
            </label>
            )}
            <DataTable 
            data={search(data)}
            />
        </div>
    )
}
export default SearchFilter;







