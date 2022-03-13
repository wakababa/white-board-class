import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import Whiteboard from "./Whiteboard";

function App() {
    const whiteboard =   new Whiteboard()
    useEffect(()=>{
        whiteboard.init()
    },[])
  return (
    <div className="App">
        <button onClick={()=>whiteboard.createShape("Rectangle",20,20,100,50)}>Text</button>
        <button onClick={()=>whiteboard.moveShape(100,20,100,100,50)}>Move</button>
        <button onClick={()=>whiteboard.resize(100,50,200)}>Resize</button>
    </div>
  );
}

export default App;
