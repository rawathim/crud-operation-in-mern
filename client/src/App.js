import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import axios from "axios"
import Formtable from './component/form';


axios.defaults.baseURL="http://localhost:8080/"

function App() {
  const [datalist,setdatalist]=useState([])
  const[addsection,setaddsection]=useState(false);
  const[editsection,seteditsection]=useState(false)
  const[formdata,setformdata]=useState({
    name : "",
    email : "",
    mobile : "",
  });


  const[formdataedit,setformdataedit]=useState({
    name : "",
    email : "",
    mobile : "",
    _id:""
  });



  const handleonchange=(e)=>{
    const {value,name}=e.target
    setformdata((preve)=>{
      return{
        ...preve,
        [name]: value
      }

    })

  }

 

  const handlesubmit = async(e)=>{
    e.preventDefault();
    const data = await axios.post("/create",formdata)
    console.log(data)
      // console.log(formdata)
    if(data.data.success){
      setaddsection(false)
      alert(data.data.message)
      getfetchdata()
      setformdata({
        name : "",
        email : "",
        mobile : "",
      })



    }
  

  }


  //conecting to server
  const getfetchdata=async()=>{
  
    const data = await axios.get("/")
    if(data.data.success){
      setdatalist(data.data)
      if(data.data.success){
      
        setdatalist(data.data.data)
      }
      // alert(data.data.data)

    }

  }

  useEffect(()=>{
    getfetchdata()
  },[])




  //delete data
const handledelete=async(id)=>{
  const data=await axios.delete("/delete/" + id)
 
  if(data.data.success){
    getfetchdata()
    alert(data.data.message)
  }

}



//update data
const handleupdate=async(e)=>{
  e.preventDefault()
  const data=await axios.put("/update" ,formdataedit)

  if(data.data.success){
    getfetchdata()
    alert(data.data.message)
    seteditsection(false)
  }


 }
  const handleEditonchange=async(e)=>{
   const {value,name}=e.target
   setformdataedit((preve)=>{
   return{
      ...preve,
      [name]: value
    }

  })

 }
 const handleEdit=(el)=>{
  setformdataedit(el)
  seteditsection(true)
 }
   
  return (
  <>
 <div className="container">
  <button className="btn btn-add" onClick={()=>setaddsection(true)}>Add</button>
  {
    addsection && (
      <Formtable
      handlesubmit={handlesubmit}
      handleonchange={handleonchange}
      handleclose={()=>setaddsection(false)}
      rest={formdata}
      />


    )
  }
  {
    editsection && (
      <Formtable
      handlesubmit={handleupdate}
      handleonchange={handleEditonchange}
      handleclose={()=>seteditsection(false)}
      rest={formdataedit}
      />

    )
  }

  <div className="tableContainer">
  <table>
  <thead>
   <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Mobile</th>
    <th></th>
</tr>
</thead>
<tbody>
  {
    datalist[0] ? (
        datalist.map((el)=>{
   
    return(
   <tr>
  <td>{el.name}</td>
  <td>{el.email}</td>
  <td>{el.mobile}</td>
  <td>
  <button className="btn btn-edit" onClick={()=>handleEdit(el)}>Edit</button>
    <button className="btn btn-delete" onClick={()=>handledelete(el._id)}>Delete</button>
  </td>

   </tr>

    )
    }))
   :(
    <p style={{textAlign:"center"}} >No data</p>
   )
  }
</tbody>
  </table>
</div>
  </div>
  
  
  </>
  );
}

export default App;
