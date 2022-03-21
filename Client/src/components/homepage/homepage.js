import React, { useState, useEffect } from "react";
import Surface from "../surface/surface";
import axios from "axios";

import "./homepage.css";
import SellerComponent from "../SellerComponent";

// var all_surfaces, row_limit;

const Homepage = ({ setLoginUser, Seller, user }) => {
  if (Seller == undefined) Seller = false;
  
  const [[surfaces, row_limit, show], setSurfaces] = useState([[], 0, true]);
   
  const surface_list = (
    <div>
      
        {surfaces.map((sf) =>
        <SellerComponent surface={sf} user={user}/>
          )}
    </div>
  );
  useEffect(() => {
    axios
      .post("http://localhost:9002/getAllSurfaces")
      .then((res) => {
        console.log(res.data.surfaces);
        setSurfaces([res.data.surfaces, Math.sqrt(res.data.surfaces.length)]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="homepage">
      
      <div className="param_wrapper">
      <div id="parameters"></div>
      <div className="mikra">
          <ul>
            <li className="reg">Regular</li>
            <li className="park">Park</li>
            <li className="road">Road</li>
          </ul>
        </div>
      </div>

      <div id="user_data"></div>

      <h1>Hello Homepage</h1>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
      {
        !Seller ? (
          <div className="table_container">
            <tbody>
              {Array.from({ length: row_limit }, (_, i) => (
                <tr>
                  {Array.from({ length: row_limit }, (_, j) => (
                    <td>
                      <Surface key = {i * row_limit + j}
                        my_surface={surfaces[i * row_limit + j]}
                        user={user}
                        Seller={Seller}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </div>
        ) : (
          <div className="seller_container">
          {surface_list}
          </div>
          )
      }
    </div>
  );
};

{
}

export default Homepage;
