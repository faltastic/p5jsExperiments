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
var n =0;
var graphData=[];

var haveFile = false;

var fileDivHTml ="";
function setup() {
    
    //radio.position(x,y);
    var fileSelect = createFileInput(gotFile);
    
    var cnv = createCanvas(0.75*windowWidth, windowHeight/2);
    //createCanvas(100, 100);
   cnv.parent('sketch-holder');
    sel = createSelect();
    sel.position(50, 100);
   // radio.position(0.1*width,windowHeight/2);
    
    fileDiv =select('#dataTable');
}
// file is a p5.File object that has metadata, and the file's contents
function gotFile(file) {
    // Make a div to display info about the file
    
    //console.log(radio);
    fileDivHTml = "" ;
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
        data=[];
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
}

function cleanupData() {
    data = [];
    var j = 0;
    for(var i=0; i<entries.length; i++){
      data[i] = [];
    }
    
    for(var i=0; i< newdata.length; i++){
      j = i%entries.length;
      data[j].push(newdata[i]);
    }
    
 
}

function newRadio(){
    
    for(var i=0; i<entries.length; i++){
      sel.option(entries[i],i);
    }
 // radio.style('width', '600px');
    textAlign(CENTER);
  //  radio.style('float', 'none'); 

}

//function processData(allText) {
//    var allTextLines = allText.split(/\r\n|\n/);
//    var headers = allTextLines[0].split(',');
//    var lines = [];
//    for (var i = 1; i < allTextLines.length; i++) {
//        var data = allTextLines[i].split(',');
//        if (data.length == headers.length) {
//            var tarr = [];
//            for (var j = 0; j < headers.length; j++) {
//                tarr.push(headers[j] + ":" + data[j]);
//            }
//            lines.push(tarr);
//        }
//    }
//   // console.log(headers);
//}


function draw(){
    
if(haveFile){
  //if (sel) {
    background(225);
  //var val = radio.value();
  
    var offset = 40; //height/10;
    line(offset,offset,offset,height-offset+10);
    line(offset-10,height-offset,width-offset,height-offset);
    
    text('graph data is '+sel.value(), width/2, height/2);
    n = sel.value();
    graphData = data[n];
        
      
  //}
}else{
      background(225);
  //var val = radio.value();
  
  var offset = 40; //height/10;
  line(offset,offset,offset,height-offset+10);
  line(offset-10,height-offset,width-offset,height-offset);
     
}
  
  //for(var i=0; i<data[n].length )      
}

