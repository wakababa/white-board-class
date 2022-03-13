import {createUUID} from "./utils";
import Rectangle from "./shapes/Rectangle";


class Whiteboard{

    constructor() {
        this.canvas = null
        this.context = null
        this.elements =[]
        this.drawing = false
        this.background = null
    }

   createCanvas(){
       const canvas = document.createElement('canvas')
       canvas.id = "canvas"
       canvas.style.backgroundColor = "#e3e3e3"
       canvas.width = window.innerWidth
       canvas.height = window.innerHeight
       const App = document.getElementsByClassName("App")[0]
       App.appendChild(canvas)
       this.canvas = canvas
       this.context = canvas.getContext("2d")
   }

   createShape(type,x1,y1,x2,y2){
   // const id = createUUID()
   const id = 100
   this.elements = [...this.elements,{id,type,x1,y1,x2,y2}]
   this.renderShapes()
   }

   renderShapes(){
       this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

       this.elements.forEach(el=>{
            console.log(el)
            if(el.type === "Rectangle"){
                const rectAngle= new Rectangle(el.x1,el.y1,el.x2,el.y2)
                rectAngle.create(this.context)
            }
        })
   }
   moveShape(id,x1,y1,x2,y2){
     const copyElements = this.elements
     const index = copyElements.findIndex(cop=>cop.id === id)
     copyElements[index] = {
         ...copyElements[index],
         x1,
         y1,
         x2,
         y2
     }
     this.renderShapes()
   }
    resize(id,x2,y2){
        const copyElements = this.elements
        const index = copyElements.findIndex(cop=>cop.id === id)
        copyElements[index] = {
            ...copyElements[index],
            x2,
            y2
        }
        this.renderShapes()
    }
    init(){
        this.createCanvas()
    }
}

export default Whiteboard
