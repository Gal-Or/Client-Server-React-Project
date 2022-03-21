import React, { useState } from "react";
import axios from "axios";
import "../login/login.css";
import "./surface.css";

// ================================= BUYER PAGE ================================= //

const Surface = ({ my_surface, user, Seller }) => {
  //const [surface, setSurface] = useState({ id: 0, forSale: false });
  //   console.log(setLoginUser);

  document.querySelector(".homepage h1").style.display = "none";
  var homepage = document.querySelector(".homepage");
  homepage.style.width = "auto";
  homepage.style.height = "0";
  homepage.style.marginTop = "2vw";


/////////////////////////////////////// requests for server ///////////////////////////////////////////////

  const updateSurfaceOwner = (surface_test) => {
    axios
      .post("http://localhost:9002/updateSurfaceOwner", surface_test) // in this sutface have id to find the surface and value to update
      .then((res) => {
        console.log(res.data.message); // response - found/not found
      });
  };

  const updateSurfaceForSale = (surface_test) => {
    //update by for sale
    axios
      .post("http://localhost:9002/updateSurfaceForSale", surface_test) // in this sutface have id to find the surface and value to update
      .then((res) => {
        console.log(res.data.message); // response - found/not found
      });
  };

  const updateUserMoney = (user) => {
    //update user money
    axios
      .post("http://localhost:9002/updateUserMoney", user) 
      .then((res) => {
        console.log(res.data.message); // response - found/not found
      });
  };

////// -----------------------------------------------------------------------------------------------//

// excute when buy a surfece 
  const transaction = () => {
    if (user.money < my_surface.price) 
      alert("Transaction cannot be completed");
    
    else {
      user.money -= my_surface.price;
      my_surface.ownerEmail = user.email;
      my_surface.forSale = false;
      // upgrade user and surface to database
      updateSurfaceOwner(my_surface);
      updateSurfaceForSale(my_surface);
      updateUserMoney(user);
    }

  };

  // execute when fress on surface
  const btnOnclick = () => {
    var parameters = document.querySelector("#parameters");
    parameters.innerHTML = "";
    parameters.style.opacity= "1";
    var trans_btn = document.createElement("a");
    var p_id = document.createElement("p");
    var p_price = document.createElement("p");
    var p_forSale = document.createElement("p");
    var game_anchor = document.createElement("a");

    p_id.innerText = "Id: " + my_surface.id;
    p_price.innerText = "Price: " + my_surface.price;

    cashout(); //make cash lable 
    if (user.email.localeCompare("123")) { // if it is NOT a guest
      trans_btn.setAttribute("class", "sale_btn " + my_surface.forSale);
      if (my_surface.forSale) trans_btn.innerText = "> BUY <";
      else trans_btn.innerText = ">Not For Sale<";
      
      trans_btn.addEventListener("click", () => {
        if (trans_btn.getAttribute("class").includes("true")) {
          var x = document.querySelector("#user_data h2");
          transaction();
          x.innerText = "Cash: " + user.money;
          trans_btn.setAttribute("class", "sale_btn false");
          trans_btn.innerText = ">> Not For Sale <<";
          
        } else console.log("false");
      });
    }

    parameters.appendChild(p_id);
    parameters.appendChild(p_price);
    parameters.appendChild(p_forSale);
    p_forSale.appendChild(trans_btn);

    if (my_surface.isConnected) {
      game_anchor.setAttribute("class", "connectToGame");
      game_anchor.href = "https://gal-or.github.io/MemoryGame/";
      game_anchor.setAttribute("target", "_blank");
      game_anchor.innerText = "Click to Play";
      parameters.appendChild(game_anchor);
    }
  };

  const changeCash = () => {
    // console.log("cashed out");
  };

  const cashout = () => {
    var user_data = document.querySelector("#user_data");
    var cash = document.createElement("h2");
    user_data.innerHTML = "";
    user_data.appendChild(cash);

    if (!user.email.localeCompare("123")) {
      cash.innerText = "Guest Mode"
    }
    else{
    
    cash.onchange = { changeCash };
    cash.innerText = "Cash: " + user.money;
    }

  };

  var surface_type;
  const getType = () => {
    switch (my_surface.surfaceType) {
      case 0:
        surface_type = "reg";
        break;
      case 1:
        surface_type = "park";
        break;
      case 2:
        surface_type = "road";
        break;
    }
  };

  getType();


  return (
    <div id="surface-container" onClick={btnOnclick} className={surface_type}>
      {my_surface.forSale ? <p>FOR SALE</p> : <p>NOT FOR SALE</p>}
    </div>
  );
};

export default Surface;
