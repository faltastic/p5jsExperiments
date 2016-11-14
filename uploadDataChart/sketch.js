// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z
var entries = [];
var newdata = [];
var labels = [];
var sel;
var selVal = 0;
var fileDiv;
var n = 100;
var lastn = 99;
var graphData = [];
var t = 0;
var haveFile = false;
var fileDivHTml = "";

function setup() {
    //radio.position(x,y);
    var fileSelect = createFileInput(gotFile);
    var cnv = createCanvas(0.75 * windowWidth, windowHeight / 2);
    //createCanvas(100, 100);
    cnv.parent('sketch-holder');
    sel = createSelect();
    sel.position(50, 100);
    // radio.position(0.1*width,windowHeight/2);
    fileDiv = select('#dataTable');
    frameRate(4);
}
// file is a p5.File object that has metadata, and the file's contents
function gotFile(file) {
    // Make a div to display info about the file
    //console.log(radio);
    fileDivHTml = "";
    //radio = "defaultradio0";
    sel = createSelect();
    sel.position(50, 100);
    //file.name +  ' - ' + file.subtype + ' - ' + file.size + ' bytes';
    // Assign a CSS class for styling (see index.html)
    //fileDiv.class('file');
    // Hanlde image and text differently
    if (file.type === 'image') {
        var img = createImg(file.data);
        img.class('thumb');
    }
    else if (file.type === 'text') {
        entries = [];
        newdata = [];
        labels = [];
        data = [];
        successFunction(file.data);
    }
}

function successFunction(data) {
    var dataN = 0;
    var allRows = data.split(/\r?\n|\r/);
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            table += '<tr>';
        }
        else {
            table += '<tr>';
        }
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (singleRow === 0) {
                table += '<th>';
                table += rowCells[rowCell];
                table += '</th>';
                if (rowCells[rowCell].length > 1) {
                    entries.push(rowCells[rowCell]);
                }
            }
            else {
                table += '<td>';
                table += rowCells[rowCell];
                if (/\d+/.test(rowCells[rowCell])) {
                    newdata.push(rowCells[rowCell]);
                }
                else {
                    labels.push(rowCells[rowCell]);
                    // console.log(rowCells[rowCell]);
                }
                table += '</td>';
            }
        }
        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        }
        else {
            table += '</tr>';
            dataN++;
        }
    }
    table += '</tbody>';
    table += '</table>';
    table += '<br />';
    fileDiv.html(table);
    //$('dataTable').append(table);
    // console.log(entries)  ;
    cleanupData();
    newRadio();
    haveFile = true;
    t = 0;
}

function cleanupData() {
    data = [];
    var j = 0;
    for (var i = 0; i < entries.length; i++) {
        data[i] = [];
    }
    for (var i = 0; i < newdata.length; i++) {
        j = i % entries.length;
        data[j].push(newdata[i]);
    }
}

function newRadio() {
    for (var i = 0; i < entries.length; i++) {
        sel.option(entries[i], i);
    }
    // radio.style('width', '600px');
    textAlign(CENTER);
    //  radio.style('float', 'none'); 
}

function draw() {
    if (haveFile) {
        t++;
        n = sel.value();
        if (lastn != n) {
            graphIt();
        }
    }     
}

function graphIt() {
    lastn = n;
    background(245);
    strokeWeight(0.5);
    stroke(50);
    //var val = radio.value();
    var offset = 60; //height/10;
    line(offset, offset-10, offset, height - offset + 10);
    line(offset - 10, height - offset, width - offset, height - offset);
    //text('graph data is ' + sel.value(), width / 2, height / 2);
    graphData = data[n];
    var dMin = Math.min.apply(Math, graphData);
    var dMax = Math.max.apply(Math, graphData);
    console.log(dMin + " " + dMax);
    
    var startL = dMin ;
    var endL = dMax ;
    for (var i = 0; i < 5; i++) {
        var h = map(i, 0, 5, offset, height - offset);
        if (dMax % 1 == 0) {
            text(map(i, 0, 5, endL, startL).toFixed(0), offset / 2, h);
        }
        else {
            text(map(i, 0, 5, endL, startL).toFixed(1), offset / 2, h);
        }
        line(offset, h, width - offset, h);
    }
    var x=[];
    var y=[];
    for(var i=0; i<labels.length;i++){
        x[i] = 2*offset +(i*(width-offset) /labels.length);
        text(labels[i], x[i], height-offset/2);
    }
    for(var i=0; i<graphData.length;i++){
        y[i] = map(graphData[i], dMin, dMax, height-offset, offset);   
    }
    strokeWeight(2.0);
    stroke(0);
    for(var i=0; i<graphData.length-1;i++){
        line(x[i],y[i],x[i+1],y[i+1]);   
    }
}
