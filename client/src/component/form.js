import React from 'react'
import "../App.css"
import { MdClose} from "react-icons/md"

const Formtable = ({handlesubmit,handleonchange,handleclose,rest})=> {

  return (
    <div className="addcontainer">
    <form onSubmit={handlesubmit}>
     <div className="close-btn" onClick={handleclose}><MdClose/> </div>
       <label htmlFor="name">Name:</label>
       <input type="text " id="name"  name="name" onChange={ handleonchange} value={rest.name}/>
 
       <label htmlFor="email">Email:</label>
       <input type="email " id="email"  name="email" onChange={ handleonchange} value={rest.email}/>
 
       <label htmlFor="mobile">Mobile:</label>
       <input type="number " id="mobile"  name="mobile" onChange={ handleonchange} value={rest.mobile}/>
 
       <button className="btn">Submit</button>
 
 
     </form>
   </div>
  )
}

export default Formtable