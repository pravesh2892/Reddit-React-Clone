
import React, {useEffect, useState} from 'react'
import not from '../../Assets/not.gif'

function CommingSoon() {
  const [text, setText] = useState("");

  useEffect(() => {
    const animateText = (word, index) => {
      setTimeout(() => {
        setText(word.substring(0, index + 1));
        if (index < word.length - 1) {
          animateText(word, index + 1);
        }
      }, 100); 
    };

    const word = "Coming soon...";
    animateText(word, 0);
  }, []);

    return (
        <div style={{position:"relative"}}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginLeft:"550px",
              paddingTop:"110px",
              color:"#0F1A1C"
            }}
          >
             <img src={not} style={{width:"40%"}}  />
             <div style={{fontSize:"24px", fontWeight:"bold", animation:"typing 3s steps(40, end)", letterSpacing:"0.15em", marginLeft:"62px"}}>{text}</div>
            <h2 style={{marginTop:"20px", marginLeft:"-45px"}}>We are working on something amazing.</h2>
            <h2 style={{ marginTop: "10px" , marginLeft:"70px"}}>Till then stay tuned</h2>
           
          </div>
        </div>
      );
}

export default CommingSoon
