import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Whiteboard from "./Whiteboard";
import {BiRectangle, BiSelection} from "react-icons/bi";
import {DRAW, RECTANGLE, SELECT} from "./constants";

function App() {
    const whiteboard =   new Whiteboard()
    useEffect(()=>{
        whiteboard.init()
    },[])


  return (
    <div className="App">
    <div className={"toolbar"} style={{display:"flex",flexDirection:"column",backgroundColor:"#FFF",position:"absolute",top:"30%",left:10,padding:10}}></div>
    </div>
  );
}

export default App;
