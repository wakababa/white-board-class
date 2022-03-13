import {createUUID, getElementAtPosition, getMousePosition} from "./utils";
import Rectangle from "./shapes/Rectangle";
import {DRAW, RECTANGLE, SELECT} from "./constants";

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
        this.tool = RECTANGLE
        this.background = "#e3e3e3"
        this.strokeStyle = "#be1717"
        this.fillStyle = "#be1717"
        this.points = initialPoints
        this.selectedElement =null
    }

    init() {this.createCanvas()}

    setTool(tool){
        this.tool = tool
    }

    mouseDown(e, canvas) {
      if(this.tool === RECTANGLE){
          this.drawing = true
          const {clientX, clientY} = getMousePosition(canvas, e)
          this.points = {
              x1: clientX,
              y1: clientY,
              x2: 0,
              y2: 0
          }
          const {x1, y1, x2, y2} = this.points

          this.createShape(RECTANGLE, x1, y1, 0, 0,this.strokeStyle)
      }
      if(this.tool === SELECT){
          this.move = true
          const {clientX, clientY} = getMousePosition(canvas, e)
          let element =  getElementAtPosition(clientX,clientY,this.elements)
          this.selectedElement = element
      }
    }

    mouseMove(e, canvas) {

        if(this.drawing && this.tool === RECTANGLE){
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                ...this.points,
                x2: clientX - this.points.x1,
                y2: clientY - this.points.y1
            }
            const {x1, y1, x2, y2} = this.points
            this.updateShape(this.elements[this.elements.length - 1].id, x1, y1, x2, y2)
        }

        if(this.move && this.tool === SELECT  && this.selectedElement){
                const {clientX, clientY} = getMousePosition(canvas, e)
                this.points = {
                    x1: clientX ,
                    y1: clientY,
                    x2:this.selectedElement.x2,
                    y2:this.selectedElement.y2,
                }
                const {x1, y1, x2, y2} = this.points
                this.updateShape(this.selectedElement.id, x1, y1, x2, y2)
        }
    }

    mouseUp(e, canvas) {
        if(this.tool === RECTANGLE){
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                ...this.points,
                x2: clientX - this.points.x1,
                y2: clientY - this.points.y1
            }
            const {x1, y1, x2, y2} = this.points
            this.updateShape(this.elements[this.elements.length - 1].id, x1, y1, x2, y2)
            this.drawing = false
            this.points = initialPoints

        }
        if(this.tool === SELECT  && this.selectedElement){
            const {clientX, clientY} = getMousePosition(canvas, e)
            this.points = {
                x1: clientX ,
                y1: clientY,
                x2:this.selectedElement.x2,
                y2:this.selectedElement.y2,
            }
            const {x1, y1, x2, y2} = this.points
            this.updateShape(this.selectedElement.id, x1, y1, x2, y2)
            this.move = false
            this.points = initialPoints
        }
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        canvas.id = "canvas"
        const App = document.getElementsByClassName("App")[0]
        App.appendChild(canvas)
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        canvas.style.backgroundColor = this.background
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
            if (el.type === RECTANGLE) {
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
