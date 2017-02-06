// based on
// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z
// Variable where we'll join all the text together
var text;
var terms = [];
var coTerms = [];
var linesTerm = [];
var arrayTerm = [];
var wholeTerm = [];
var D = [];
var bugout = new debugout();

function setup() {
    var fileName = "data/all.txt";
    // The second argument to loadStrings() is the name
    // of the function that will run when the file is loaded
    // This is known as a "callback"
    loadStrings(fileName, parseData);
    //console.log(txtData);    
    console.log(arrayTerm);
    //console.log(terms);
    
    //analyzeData();
}
// The data from the file comes in as the array lines
function parseData(lines) {
    
    var n = 0;
    for (var i = 0; i < lines.length; i++) {
        if (parseInt(lines[i]) < 200) {
            // console.log(lines[i]);
            terms.push(lines[i+1]);
            coTerms.push(lines[i+2].split(" - "));
            arrayTerm.push(linesTerm);
            wholeTerm.push(linesTerm.join(" "));
            linesTerm = [];
            n = n + 1;
            
        }
        else {
            n = 0;
            linesTerm.push(lines[i]);
        }
    }
    
    // for the last term
    arrayTerm.push(linesTerm);
            wholeTerm.push(linesTerm.join(" "));
            linesTerm = [];
    wholeTerm.shift();
    
    //    txtData.push(lines);
    // join() joins the elements of an array
    // Here we pass in a line break to retain formatting
    //text = lines.join(' <br /> ');
    //var par = createP(text);
    //par.id('text');
    
    
    var m, lm;
    var newText, newTerm;
    /*
    for (var i = 0; i < terms.length ; i++) {
        newText = wholeTerm[i];
        D[i] = [];
        for (var j = 0; j < terms.length ; j++) {
            D[i][j] = 0;
            newTerm = terms[j];
            if (i != j) {
                m = newText.indexOf(newTerm);
                lm = newText.lastIndexOf(newTerm);
                
//                if(m>0)
//                {
//                    console.log("m = " + m);    
//                    console.log("lm = " + lm);
//                }
                
                while (m < lm) {
                    //console.log(m); 
                    D[i][j] += 1;
                    m = newText.indexOf(terms[j], m + 1);
                }
            }
        }
    }
    */
  //  console.log(arrayTerm);
   // saveStrings(JSON.stringify(D), 'nouns.txt');
 // bugout.log(arrayTerm);
//    bugout.log(JSON.stringify(D));
//   bugout.downloadLog();
}