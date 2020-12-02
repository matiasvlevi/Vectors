
class GraphicVector {
    constructor(x,y,col,name) {
        this.v = createVector(x,y);
        this.color = col;
        this.id = name;
    }
    render() {
        angleMode(DEGREES);

        strokeWeight(1/zoom);

        stroke(this.color);

        line(0,0,this.v.x,this.v.y);

        this.drawM();
        this.drawArrow();
        this.drawArc();

        noStroke();
        fill(255)
        let dx = round((this.v.x/step)*10)/10;
        let dy = round((this.v.y/step)*10)/10;
        text(this.id+'('+dx+','+(-dy)+')',this.v.x+15,this.v.y-15)
    }
    drawM() {
        stroke(0,255,50);
        line(this.v.x,this.v.y,this.v.x,0);
        stroke(0,150,255);
        line(this.v.x,this.v.y,0,this.v.y);
    }
    drawArc() {
        noFill();
        arc(0,0,64,64,-angleV(this.v),0);
        let x = 55*cos(-angleV(this.v)/2);
        let y = 55*sin(-angleV(this.v)/2);
        textAlign(CENTER);
        noStroke();
        fill(this.color);
        text(round(angleV(this.v)),x,y+8)

    }
    drawArrow() {
        stroke(this.color);

        let rotR = rotateVa(this.v, 150-angleV(this.v));
        let rotL = rotateVa(this.v, 210-angleV(this.v));
        line(this.v.x,this.v.y,this.v.x+rotR.x,this.v.y+rotR.y);
        line(this.v.x,this.v.y,this.v.x+rotL.x,this.v.y+rotL.y);

    }
}

function makeGraph() {
    stroke(255,100);

    let grid = wnx;
    line(0,-grid/zoom,0,grid/zoom);
    line(-grid/zoom,0,grid/zoom,0);
    stroke(255,20);
    let xnb = 25;
    let ynb = 12;
    for (let i = 0; i < xnb/zoom; i++) {
        line(i*step,grid/zoom,i*step,-grid/zoom);
        line(-i*step,grid/zoom,-i*step,-grid/zoom);
    }
    for (let i = 0; i < ynb/zoom; i++) {
        line(grid/zoom,i*step,-grid/zoom,i*step);
        line(grid/zoom,-i*step,-grid/zoom,-i*step);
    }

}
function mouseWheel(event) {
    zoom += event.delta/5000;

    if (zoom <= 0) {
        zoom = 1;
    }
}
