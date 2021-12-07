import React from 'react'

export default function Header(props) {
  return (
    <header className="container-header">

      <div>
          <img className="img-logo"
              src="./assets/logoSPC.svg"

              alt="logo spendcoin"
            />
      </div>
        <div>
          <div id="user-profile"> 
            <button
              type="button"
              className="btn btn-lg login"
              style={{ backgroundColor: "#21587D" }}
            >
              Polygon
            </button>
            &nbsp;
            <button
              onClick={props.handleClick}
              type="button"
              className="btn btn-lg login"
              style={{ backgroundColor: props.colorBtn }}
            >
              Connect Wallet
            </button>
          </div> 

        <div class="network-name">
          {props.network.name}
       </div>
      
      </div>
     

    </header>
  );
}
