"use client";

import Document from 'next/document'
import {UseState} from "react"
import { useEffect } from "react";
import * as React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';




export default function Home() {
  // useEffect(() => {
  //   // Perform localStorage action
  //   )
  // }, [])



  
  
  return (
    <main className="items-center">

      <br></br>
      <center>
      <h1 style={{fontSize: 40}}>OATS PICKER</h1>
      <br>
      </br>
      <OatAdder />
      </center>
      <Footer />

    </main>
  )
}

// function OatAdder() {
//   return <button className="button" onClick={handleClick}></button>;

//   function handleClick() {
//     //TODO
//   }
    
// }

function OatAdder() {
  const [open, setOpen] = React.useState(false);
  const [oatData, setOatData] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(localStorage.getItem("oats"))
      if (localStorage.getItem("oats") != null) {
        console.log("hi")
        setOatData(JSON.parse(localStorage.getItem("oats")));

        setSubmitted(true);
      }
    }
  }, []);


  





  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOats = () => {
    setOpen(false);

    var oatStr = oatData

    oatStr = oatStr.trimStart()

    let oatArray = oatStr.split("     ")

    for (let i = 0; i < oatArray.length; i++) {
      oatArray[i] = oatArray[i].split(" × ")
    }
    oatArray.unshift(["Amount", "Flavor"])
    setOatData(oatArray)
    localStorage.setItem("oats",JSON.stringify(oatArray))
    window.location.reload(true);
    setSubmitted(true);

  };

  return (
    <>
      <button className="button" onClick={handleClickOpen}>
        Add Oats Here ;)
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Oats Ordered</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Go to https://www.oatsovernight.com/account#/orders and paste in the order, after "X meals ordered"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Oat info (Should start with '[amount] × [flavor]')"
            type="info"
            fullWidth
            variant="standard"
            onChange={e => {
              setOatData(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOats}>Enter</Button>
        </DialogActions>
      </Dialog>
      <br></br>
      {submitted && <TableFrameWork oatData = {oatData}/>}
      
    </>
  );
}

function TableFrameWork({oatData}) {
  
  const [newOatData, setNewOatData] = React.useState(oatData);
  return(
    <>
      <br>
      </br>
      <OatTable oatData = {newOatData}/>
      <br>
      </br>
      <OatButton oatData = {newOatData} changeOat = {changeOat}/>
    </>
  );
  
  function changeOat(newOat) {
    
    setNewOatData(newOat);
    localStorage.setItem("oats",JSON.stringify(oatData))
  }
}


function OatTable({oatData}) {

  return(
    <div>

        <table>

          <thead>

            <tr>

              {oatData[0].map((item, index) => {

                return <th>{item}</th>;

              })}

            </tr>

          </thead>

          <tbody>

            {oatData.slice(2, oatData.length).map((item, index) => {

              return (

                <tr>

                  <td>{item[0]}</td>

                  <td>{item[1]}</td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>
    );
}

function OatButton({oatData, changeOat}) {
  const [chosenFlavor, setChosenFlavor] = React.useState('');

  

  function handleRandom() {
    const updatedOatData = [...oatData];
    let randIndex = 0 
    let sum = 0
    for (let i = 2; i < updatedOatData.length; i++) {
      sum += parseInt(updatedOatData[i][0])
    }
    console.log(sum)
    if (sum > 0) {
      while (true) {
        randIndex = Math.floor(Math.random() * updatedOatData.length)
        if (randIndex > 1) {
          if (updatedOatData[randIndex][0] > 0) {
            break;
          }
          
        }
  
      }
  
      updatedOatData[randIndex][0]--
  
      console.table(updatedOatData)
  
      
    }
    const selectedFlavor = updatedOatData[randIndex][1];

    setChosenFlavor(selectedFlavor); 
    changeOat(updatedOatData)
    
    

    
    
  }

  return(
    <>
    <button className="button" onClick={handleRandom}>
      Select Random Flavor
    </button>
    {chosenFlavor && <p>Try {chosenFlavor} this time 😁</p>}
    </>
  );
}

function Footer() {
  return (
    <footer style={{ textAlign: 'center', marginTop: '20px' }}>
      Created by  
<a href="https://github.com/shubhambhatnag" className='link'> Shubham Bhatnagar</a>

    </footer>
  );
}