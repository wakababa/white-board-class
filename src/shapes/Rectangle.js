class Rectangle{
    constructor(x1,y1,x2,y2) {
        this.x1=x1
        this.y1=y1
        this.x2=x2
        this.y2=y2
    }
    create(context){
        context.beginPath();
        context.rect(this.x1,this.y1,this.x2,this.y2);
        context.stroke();
        context.closePath()
    }

}
export default Rectangle