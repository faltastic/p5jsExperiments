// based on
// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

// Variable where we'll join all the text together
var text;
var txtData =[];

function setup() {
  
  txtData[0]= ""; // empty
    
  for( var i =1; i<=3; i++){
      var fileName = "data/" + i + ".txt";
      // The second argument to loadStrings() is the name
      // of the function that will run when the file is loaded
      // This is known as a "callback"
      loadStrings(fileName, fileready);
  }
    
console.log(txtData);    

}

// The data from the file comes in as the array lines
function fileready(lines) {

  // add to txtData    
  txtData.push(lines);
    
  // join() joins the elements of an array
  // Here we pass in a line break to retain formatting
  text = lines.join(' <br /> ');
  var par = createP(text);
  par.id('text');
  
}

