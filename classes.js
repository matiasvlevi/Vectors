let drawM = false;
class GraphicVector {
    constructor(x,y,col,name,id) {
        this.v = createVector(x,y);
        this.color = col;
        this.id = id;
        this.dpname = name;
        this.origin = createVector(0,0);
        this.static = false;
        this.second = false;
        this.parents = [];
    }
    setOrigin(x,y) {
        this.origin.x = x;
        this.origin.y = y;
    }
    render() {
        if (this.second) {
            this.setOrigin(this.parents[0].v.x,this.parents[0].v.y);

        }
        if (this.parents.length !== 0 && this.second !== true) {
            this.v.mult(0);

            this.v.x = this.parents[0].v.x + this.parents[1].v.x;
            this.v.y = this.parents[0].v.y + this.parents[1].v.y;
        }
        angleMode(DEGREES);

        strokeWeight(1/zoom);

        stroke(this.color);

        line(this.origin.x,this.origin.y,this.v.x+this.origin.x,this.v.y+this.origin.y);
        this.drawArrow();
        if (this.parents.length <= 0) {
            this.drawArc();




        }
        if (drawM == true) {
            this.drawM();
        }

        noStroke();
        fill(this.color)
        let dx = round((this.v.x/step)*10)/10;
        let dy = round((this.v.y/step)*10)/10;
        let decal = 0;
        if (this.second) {
            decal = 15;
        }

        text(this.dpname+'('+dx+','+(-dy)+')',this.v.x+this.origin.x+15,this.v.y+this.origin.y-15-decal)
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
        line(this.origin.x+this.v.x,this.origin.y+this.v.y,this.origin.x+this.v.x+rotR.x,this.origin.y+this.v.y+rotR.y);
        line(this.origin.x+this.v.x,this.origin.y+this.v.y,this.origin.x+this.v.x+rotL.x,this.origin.y+this.v.y+rotL.y);

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
