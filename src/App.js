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
        <div>
            <button  onClick={()=>{whiteboard.setToolType(SELECT)}}><BiSelection /></button>
            <button onClick={()=>{whiteboard.setToolType(RECTANGLE)}}><BiRectangle /></button>
        </div>
        <button onClick={()=>whiteboard.createShape("Rectangle",20,20,100,50,"#102bc9")}>Demo Rectangle</button>
    </div>
  );
}

export default App;
