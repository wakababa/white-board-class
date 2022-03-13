import {createUUID, getElementAtPosition, getMousePosition} from "./utils";
import Rectangle from "./shapes/Rectangle";

const initialPoints = {
    x1: null,
    y1: null,
    x2: null,
    y2: null,
}

class Whiteboard {

    constructor() {
        this.canvas = null
        this.context = null
        this.elements = []
        this.drawing = false
        this.move = false
        this.tool = "select"
        this.background = null
        this.strokeStyle = "#be1717"
        this.fillStyle = "#be1717"
        this.points = initialPoints
        this.selectedElement =null
    }

    init() {this.createCanvas()}

    mouseDown(e, canvas) {
      if(this.tool === "draw"){
          this.drawing = true
          const {clientX, clientY} = getMousePosition(canvas, e)
          this.points = {
              x1: clientX,
              y1: clientY,
              x2: 0,
              y2: 0
          }
          const {x1, y1, x2, y2} = this.points

          this.createShape("Rectangle", x1, y1, 0, 0,this.strokeStyle)
          console.log(this.points)
      }
      if(this.tool === "select"){
          this.move = true
          const {clientX, clientY} = getMousePosition(canvas, e)
          let element =  getElementAtPosition(clientX,clientY,this.elements)
          console.log(element)
          this.selectedElement = element
      }
    }

    mouseMove(e, canvas) {
        if (this.drawing && this.tool === "draw") {
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                ...this.points,
                x2: this.ele,
                y2: clientY - this.points.y1
            }
            const {x1, y1, x2, y2} = this.points
            console.log(this.points)

            this.updateShape(this.elements[this.elements.length - 1].id, x1, y1, x2, y2)

        }
        if(this.tool === "select" && this.move){
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                x1: clientX ,
                y1: clientY,
                x2:this.selectedElement.x2,
                y2:this.selectedElement.y2,
            }
            const {x1, y1, x2, y2} = this.points
            console.log(this.points)

            this.updateShape(this.selectedElement.id, x1, y1, x2, y2)
        }
    }

    mouseUp(e, canvas) {
        if(this.tool === "draw"){
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                ...this.points,
                x2: clientX - this.points.x1,
                y2: clientY - this.points.y1
            }
            const {x1, y1, x2, y2} = this.points
            console.log(this.points)

            this.createShape("Rectangle", x1, y1, x2, y2, this.strokeStyle)
            this.drawing = false

        }
        if(this.tool === "select"){
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                x1: clientX ,
                y1: clientY,
                x2:this.selectedElement.x2,
                y2:this.selectedElement.y2,
            }
            const {x1, y1, x2, y2} = this.points
            console.log(this.points)

            this.updateShape(this.selectedElement.id, x1, y1, x2, y2)
            this.move = false
        }
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        canvas.id = "canvas"
        const App = document.getElementsByClassName("App")[0]
        App.appendChild(canvas)
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        canvas.style.backgroundColor = "#e3e3e3"
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        canvas.addEventListener('mousedown', (e) => this.mouseDown(e, canvas), false);
        canvas.addEventListener('mousemove', (e) => this.mouseMove(e, canvas), false);
        canvas.addEventListener('mouseup', (e) => this.mouseUp(e, canvas), false);
    }

    createShape(type, x1, y1, x2, y2,strokeStyle) {
        const id = createUUID()
        this.elements = [...this.elements, {id, type, x1, y1, x2, y2,strokeStyle}]
        this.renderShapes()
    }

    renderShapes() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.elements.forEach(el => {
            console.log(el)
            if (el.type === "Rectangle") {
                const rectAngle = new Rectangle(el.x1, el.y1, el.x2, el.y2,el.strokeStyle)
                rectAngle.create(this.context)
            }
        })
    }

    updateShape(id, x1, y1, x2, y2) {
        const copyElements = this.elements
        const index = copyElements.findIndex(cop => cop.id === id)
        copyElements[index] = {
            ...copyElements[index],
            x1,
            y1,
            x2,
            y2
        }
        this.renderShapes()
    }

}

export default Whiteboard
