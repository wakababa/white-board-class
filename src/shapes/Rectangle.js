class Rectangle{
    constructor(x1,y1,x2,y2,strokeStyle) {
        this.x1=x1
        this.y1=y1
        this.x2=x2
        this.y2=y2
        this.strokeStyle = strokeStyle
    }
    create(context,strokeColor){
        context.beginPath();
        context.rect(this.x1,this.y1,this.x2,this.y2);
        context.strokeStyle=this.strokeStyle
        context.stroke();
        context.closePath()
    }

}
export default Rectangle