import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Whiteboard from "./Whiteboard";

function App() {
    const whiteboard =   new Whiteboard()
    useEffect(()=>{
        whiteboard.init()
    },[])
  return (
    <div className="App">
        <button onClick={()=>whiteboard.createShape("Rectangle",20,20,100,50,"#102bc9")}>Text</button>
    </div>
  );
}

export default App;
