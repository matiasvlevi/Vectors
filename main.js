let v = 0;
let wnx = window.innerWidth;
let wny = window.innerHeight;
let vectors = [];
let step = 40;
let zoom = 1;



function setup() {
    createCanvas(wnx,wny);


}

function draw() {
    background(51);
    translate(wnx/2,wny/2);
    scale(zoom);
    textSize(14/zoom);
    makeGraph();
    for (let i = 0; i < vectors.length; i++) {
        vectors[i].render();
    }

}

function mouseDragged() {
    if (mouseX > (wnx/10)*2) {
        let x = vectors[v].origin.x;
        let y = vectors[v].origin.y;
        vectors[v].v.x = ((mouseX-x)-wnx/2)/zoom;
        vectors[v].v.y = ((mouseY-y)-wny/2)/zoom;
    }

}
