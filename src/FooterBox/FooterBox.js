import React from "react";
import './footerBox.css';



const FooterBox = () => {

    const nameCreator = "Volia";

    return (
      <div className="footerBox">
         <div className="textInFooter">
                <p>Created by <span>{nameCreator}</span></p>
        </div>
      </div>
    );
  };
  
  
  
  export default FooterBox;