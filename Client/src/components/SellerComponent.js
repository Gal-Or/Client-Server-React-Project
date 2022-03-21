import React, { useState } from "react";
import axios from "axios";
import "./SellerComponent.css";
import { set } from "mongoose";

// ================================= SELLER PAGE ================================= //


const SellerComponent = ({surface, user}) => {

    document.querySelector('.homepage h1').style.display ='none'
    var homepage = document.querySelector(".homepage");
    homepage.style.height = "100%";
    homepage.style.marginTop = "33vw";
    homepage.style.width = "auto";

    var parms = document.querySelector('.param_wrapper');
    parms.style.opacity = 0;
    parms.style.marginTop = 0


    const [price, setPrice] = useState(surface.price);
    const [forSale, setForSale] = useState(surface.forSale);
    const [checked, setConnection] = useState(surface.isConnected);
    const [email, setEmail] = useState(surface.ownerEmail);


    const emailHandler = (event) =>{
      setEmail(event.target.value)
    } 
  
    const handleChange = (event) => {
      setPrice(event.target.value)
      
  };

      const forSaleHandleChange = (event) => {
      setForSale(event.target.value)
      
  };



  const cashOut = () => { // make cash lable
    var user_data = document.querySelector("#user_data");
    var cash = document.createElement("h2");
    user_data.innerHTML = "";
   // user_data.style.marginTop= "-55vw";
    user_data.appendChild(cash);
    cash.innerText = "Cash: " + user.money;
  };
  
  cashOut();



 const updateOwner = () =>{
   if(email != "" && email.includes("@")){
     surface.ownerEmail = email;
      updateSurfaceOwner(surface);
   }else
    alert("Owner is not exist.")
    
  }

  const updateSurfaceOwner = (surface) => {
    axios
      .post("http://localhost:9002/updateSurfaceOwner", surface) // in this sutface have id to find the surface and value to update
      .then((res) => {
        alert(res.data.message);
      });
  };
 
   const updatePrice = () =>{
    surface.price=price;
    updateSurfacePrice(surface);
  }

  const updateSurfacePrice = (surface) => {
    axios
      .post("http://localhost:9002/updateSurfacePrice", surface) // in this sutface have id to find the surface and value to update
      .then((res) => {
        alert(res.data.message);
      });
  };

  const updateForSale = ()=>{
    if( !(forSale === "true" || forSale === "false") ){
      alert("Is For Sale Must Be: true or false! ");
      return;
    }
    surface.forSale =forSale;
    updateSurfaceForSale(surface);

  }

   const updateSurfaceForSale = (surface) => {
    axios
      .post("http://localhost:9002/updateSurfaceForSale", surface) // in this sutface have id to find the surface and value to update
      .then((res) => {
        alert(res.data.message);
      });
  };

    const connectionHandle = (event) =>{
    var temp = !checked;
    setConnection(temp);
    surface.isConnected = temp; 
    updateSurfaceConnection(surface);
    }

  const updateSurfaceConnection = (surface) => {
    axios
      .post("http://localhost:9002/updateSurfaceConnection", surface) // in this sutface have id to find the surface and value to update
      .then((res) => {
        alert(res.data.message);
      });
  };
  

  
  return (
    surface.ownerEmail === user.email ?
    <div className="seller_surface">
      <div className="id">
       <h2> ID:</h2> <h3> {surface.id}</h3>
      </div>
      <div className="first">
        <h3>Price:</h3>
          <input type="number"
          value={price}
          pattern="[0-9]*"
          onChange={handleChange}
          placeholder="put price here" />
          <input type="submit" value="submit" onClick={updatePrice} />
      </div>

      <div className="second">
          <h3>is For Sale?</h3>
          <input type="text" value={surface.isForSale} onChange={forSaleHandleChange} placeholder="true or false" />
          <input type="submit" value="submit" onClick={updateForSale} />
      </div>
      
      <div className="third">
          <h3>Email Owner:</h3>
          <input type="text" onChange ={emailHandler} value={email} placeholder="example123@gmail.com" />
          <input type="submit" value="submit" onClick={updateOwner} />
      </div>

      <div className="forth">
          <h3>Connected to the Game?</h3>
          <input type="checkbox" onClick={connectionHandle} checked={checked} />
      </div>

    </div>
    :
    <div>
      
    </div>
    
  );
};

export default SellerComponent;
