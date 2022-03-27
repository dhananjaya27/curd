import React, { useEffect, useState } from 'react'
import app from './firebase';
// import { db } from './firebase';

// import { set, ref, onValue, remove, update } from "firebase/database";

function Curd() {
    //for consuming firstname
    const [firstName,setfirstName]=useState('')
    //store consuming lastname
    const [lastName,setlastName]=useState('')
    //for consuming data from data base
    const [userData,setuserData]=useState([])
    //for consuming updated firstname
    const [ufirstName,setufirstName]=useState('')
    //for consuming updated lastname
    const [ulastName,setulastName]=useState('')
    const[userId,setuserId]=useState('')


    //getting data from firebase
    useEffect(()=>{
        const firestore= app.database().ref("userInfo");
        firestore.on("value",(respoonse)=>{
            const data=respoonse.val();
            let userInfo=[]
            for(let id in data){
                userInfo.push({
                    id:id,
                    firstName:data[id].firstName,
                    lastName:data[id].lastName
                })
            }
            //get the data from data base and consume
            setuserData(userInfo)
        })
     },[] )

     //get the data from user and store in firebase database
    function handleAdduser(){
    const firestore= app.database().ref("userInfo");
    const data={
        firstName:firstName,
        lastName:lastName
    }
    firestore.push(data)

    }

    //update the daata
    function handleupdatauser(data){
        setufirstName(data.firstName);
        setulastName(data.lastName)
        setuserId(data.id)
    }

    function userupdate(){
        const firestore= app.database().ref("userInfo").child(userId);
     firestore.update({
        firstName:ufirstName,
        lastName:ulastName
     })
          setufirstName('')
          setulastName('')
    }
    //delete the data from database
    function handledelete(id){
        const firestore= app.database().ref("userInfo").child(id);
        firestore.remove()
    }
  return (
    <>
    {/* //user input form */}
    <form>
       firstName:<input type="text" value={firstName} onChange={(e)=>setfirstName(e.target.value)}/>
       lastName:<input type="text" value={lastName} onChange={(e)=>setlastName(e.target.value)}/>
       <button onClick={()=>handleAdduser()}>submit</button>
    </form>
    {/* //if inut form is empty show no data  */}
    {userData.length===0?(
        <section>
            <h4>oops!there is no data </h4>
        </section>
    ):
    //table for showing in put data
    <section>
        <table>
  <tr>
    <th>firstName</th>
    <th>lastName</th>
  </tr>
  {/* //if data is availabe in database show all the data in table */}
     {userData.map((data,index)=>{
         return(
            <tr>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            {/* //button for update  */}
            <button onClick={()=>handleupdatauser(data)}>update</button>
            {/* button for dalete */}

            <button onClick={()=>handledelete(data.id)}>delete</button>
            </tr>
           
         )
       
     })}
  </table>
        </section>}
             {/* form for update data */}
        <form>
       firstName:<input type="text" value={ufirstName} onChange={(e)=>setufirstName(e.target.value)}/>
       lastName:<input type="text" value={ulastName} onChange={(e)=>setulastName(e.target.value)}/>
       <button onClick={()=>userupdate()}>updated</button>
    </form>
    </>
  )

    }
export default Curd;