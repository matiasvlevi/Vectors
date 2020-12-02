
function lengthV(v) {
    return sqrt(pow(v.x,2)+pow(v.y,2));
}
function rotateVa(v,a) {

    let l = lengthV(v);
    let x = l*cos(a);
    let y = l*sin(a);

    let v2 = createVector(x,y);
    let v3 = normalizeV(v2);
    let v4 = scalarV(v3,16);
    return v4;
}
function rotateV(v,a) {

    angleMode(DEGREES);

    let l = lengthV(v);
    let x = round(Math.cos(a)*l);
    let y = round(Math.sin(a)*l);

    let v2 = createVector(x,y);

    return v2;
}
function angleV(v) {
    let buffer = 0;
    let scale = 1;

    if (v.x > 0 && v.y > 0) {
        buffer = 360;
        scale = -1;
    } else if (v.x < 0 && v.y > 0) {
        buffer = 180;
        scale = 1;
    } else if (v.x < 0 && v.y < 0) {
        buffer = 180;
        scale = -1;
    } else if (v.x > 0 && v.y < 0) {
        buffer = 0;
        scale = 1;
    }
    let a = -1*atan(abs(v.x/v.y))+90;
    let angle = buffer + scale*(a);

    return angle;
}
function normalizeV(v) {

    let l = lengthV(v);
    let x = v.x/l;
    let y = v.y/l;
    let v2 = createVector(x,y);
    return v2;

}

function scalarV(v,s) {

    let x = v.x*s;
    let y = v.y*s;

    let v2 = createVector(x,y)
    return v2;
}
function addVector() {
    //let col = prompt('color');
    if (document.getElementById('cboard') == undefined) {
        let div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('id','cboard');

        let inputElement = document.createElement('input');
        document.getElementById('cboard').appendChild(inputElement);
        inputElement.setAttribute('type','color');
        inputElement.setAttribute('value','#fff');
        inputElement.setAttribute('name','vecColor');
        inputElement.setAttribute('id','vecColor');
        inputElement.setAttribute('class','colorPicker');
        let inputElement2 = document.createElement('input');
        document.getElementById('cboard').appendChild(inputElement2);
        inputElement2.setAttribute('type','button');
        inputElement2.setAttribute('value','Sumbit');
        inputElement2.setAttribute('class','sumbit');
        inputElement2.setAttribute('onClick','sumbit()');
    }

    //vectors.push(new GraphicVector(40,-40,color(0,255,150)));

}
function sumbit() {
    let name = 'vector_'+vectors.length;
    let index = vectors.length;
    let nb = 0;
    let color = document.getElementById('vecColor').value;
    console.log(color);

    document.getElementById('cboard').remove();


    let div;
    if (document.getElementById('vecslot_'+name) == undefined) {
        div = document.createElement('div');
        div.setAttribute('id','vecslot_'+name);
        document.getElementById('container').appendChild(div);
    } else {
        console.log('exists');
        let exi = false;
        do {
            console.log(exi)
            nb += 1;
            name = 'vector_'+(index+nb);

            if (document.getElementById('vecslot_'+name) == undefined) {

                console.log('yep');
                exi = true;

            } else {
                console.log('nope');
            }
        }
        while(exi == false);
        div = document.createElement('div');
        div.setAttribute('id','vecslot_'+name);
        document.getElementById('container').appendChild(div);


    }
    let v = new GraphicVector(step,-step,color,name);
    vectors.push(v);

    let sbutton = document.createElement('button');
    sbutton.setAttribute('class','sbutton');
    sbutton.setAttribute('onCLick','selectSlot('+index+','+nb+')')
    sbutton.textContent = name;
    document.getElementById('vecslot_'+name).appendChild(sbutton);
    let dbutton = document.createElement('button');
    dbutton.setAttribute('class','dbutton');
    dbutton.setAttribute('onCLick','removeslot('+index+','+nb+')')
    dbutton.textContent = 'x';
    document.getElementById('vecslot_'+name).appendChild(dbutton);
}

function selectSlot(index,nb) {
    for (let i = 0; i < vectors.length; i++) {
        if (vectors[i]['id'] == 'vector_'+(index+nb)) {
            v = i;
        }
    }
    return v;
}
let globalIndex= 0;
function removeslot(index,nb) {
    let name = 'vector_'+index;

    vectors.splice(index,1)


    document.getElementById('vecslot_vector_'+index).remove();
    globalIndex++;

}
