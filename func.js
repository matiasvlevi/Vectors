
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

        inputElement2.setAttribute('type','text');
        inputElement2.setAttribute('id','dpname');
        document.getElementById('cboard').appendChild(inputElement2);

        let inputElement3 = document.createElement('input');

        inputElement3.setAttribute('type','button');
        inputElement3.setAttribute('value','Sumbit');
        inputElement3.setAttribute('class','sumbit');
        inputElement3.setAttribute('onClick','sumbit()');
        document.getElementById('cboard').appendChild(inputElement3);
    }

    //vectors.push(new GraphicVector(40,-40,color(0,255,150)));

}
function sumbit() {
    let name = 'vector_'+vectors.length;
    let index = vectors.length;
    let nb = 0;
    let color = document.getElementById('vecColor').value;
    let dpname = document.getElementById('dpname').value;

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
    let v = new GraphicVector(step,-step,color,dpname,name);
    vectors.push(v);

    let sbutton = document.createElement('button');
    sbutton.setAttribute('class','sbutton');
    sbutton.setAttribute('onCLick','selectSlot('+index+','+nb+')')
    sbutton.textContent = dpname;
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
function preaddition() {
    if (document.getElementById('cboard') == undefined) {
        let div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('id','cboard');

        let inputElement = document.createElement('input');
        document.getElementById('cboard').appendChild(inputElement);
        inputElement.setAttribute('type','text');
        inputElement.setAttribute('id','addform');

        let inputElement2 = document.createElement('input');
        document.getElementById('cboard').appendChild(inputElement2);
        inputElement2.setAttribute('type','button');
        inputElement2.setAttribute('value','Sumbit');
        inputElement2.setAttribute('class','sumbit');
        inputElement2.setAttribute('onClick','sumbitaddition()');
    }
}
function findVector(name) {
    let v1 = 0;
    for (let i = 0; i < vectors.length; i++) {
        if (vectors[i]['dpname'] == name) {
            v1 = vectors[i];
        }
    }
    return v1;
}
function sumbitaddition() {
    strarr = document.getElementById('addform').value.split(" ");
    if (strarr.length <= 1) {
        return;
    }
    document.getElementById('cboard').remove();
    console.log(strarr);
    let v1 = findVector(strarr[0]);
    let v2 = findVector(strarr[2]);
    let x = v1.v.x + v2.v.x;
    let y = v1.v.y + v2.v.y;
    let dpname = v1.dpname + strarr[1] + v2.dpname;
    let v3 = new GraphicVector(x,y,color(random(50,255),random(50,255),random(50,255)),dpname,undefined);
    v3.parents.push(v1);
    v3.parents.push(v2);

    v2.parents.push(v1);
    v2.second = true;

    v2.v.x = v2.v.x + v2.origin.x;
    v2.v.y = v2.v.y + v2.origin.y;
    let name = 'vector_'+vectors.length;
    let index = vectors.length;
    let nb = 0;

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

    vectors.push(v3);

    let sbutton = document.createElement('button');
    sbutton.setAttribute('class','sbutton');
    sbutton.setAttribute('onCLick','selectSlot('+index+','+nb+')')
    sbutton.textContent = dpname;
    document.getElementById('vecslot_'+name).appendChild(sbutton);
    let dbutton = document.createElement('button');
    dbutton.setAttribute('class','dbutton');
    dbutton.setAttribute('onCLick','removeslot('+index+','+nb+')')
    dbutton.textContent = 'x';
    document.getElementById('vecslot_'+name).appendChild(dbutton);

}
