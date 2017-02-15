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
var Din = []
    , Dout = []
    , D = [];
var bugout = new debugout();

function setup() {
    var fileName = "data/all.txt";
    // The second argument to loadStrings() is the name
    // of the function that will run when the file is loaded
    // This is known as a "callback"
    loadStrings(fileName, parseData);
    //console.log(txtData);    
    //console.log(arrayTerm);
    //console.log(terms);
    //analyzeData();
}
// The data from the file comes in as the array lines
function parseData(lines) {
    var n = 0;
    for (var i = 0; i < lines.length; i++) {
        if (parseInt(lines[i]) < 200) {
            // console.log(lines[i]);
            terms.push(lines[i + 1]);
            
            arrayTerm.push(linesTerm);
            wholeTerm.push(linesTerm.join(" "));
            linesTerm = [];
            if (lines[i + 2].indexOf(")") > 0) {
                lines[i + 2] = lines[i + 2].replace(")", "");
                lines[i + 2] = lines[i + 2].replace("(", "");
                lines[i + 2] = lines[i + 1] + " - " + lines[i + 2];
                lines[i + 2] = lines[i + 2].split(" - ");
                coTerms.push(lines[i + 2] );
                
            }
            else {
                lines[i + 1] = [lines[i + 1], "XYsdaeftgZ"];
                coTerms.push(lines[i + 1]);
                
                //coTerms.push(li);
            }
            i = i + 1;
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
    //linesTerm = [];
    wholeTerm.shift();
    
    coTerms[53][0] = " خل ";
    coTerms[58][0] = " دم ";
    coTerms[26][0] = " بصل ";
    coTerms[76][0] = " ظلم ";
    coTerms[82][0] = " عيش ";
    coTerms[42][1] = " جيش ";
    coTerms[73][1] = " حي ";
    // All the same length now
    //    txtData.push(lines);
    // join() joins the elements of an array
    // Here we pass in a line break to retain formatting
    //text = lines.join(' <br /> ');
    //var par = createP(text);
    //par.id('text');
    var m, lm;
    var newText, newTerm;
    for (var i = 0; i < terms.length; i++) {
        Din[i] = [];
        Dout[i] = [];
        D[i] = [];
        for (var j = 0; j < terms.length; j++) {
            Din[i][j] = 0;
            Dout[i][j] = 0;
            D[i][j] = 0;
        }
    }
    // First Direction
    // check term's text for all other terms
    
    for (var i = 0; i < terms.length; i++) {
        newText = wholeTerm[i];
        for (var j = 0; j < terms.length; j++) {
            for (var k = 0; k < coTerms[j].length; k++) {
                newTerm = coTerms[j][k];
                 Dout[j][i] += coOccur(newTerm, newText);
            }
        }
    }
    
    // Second Direction
    // check all texts for term
    for (var j = 0; j < terms.length; j++) {
        for (var k = 0; k < coTerms[j].length; k++) {
            newTerm = coTerms[j][k];
            for (var i = 0; i < terms.length; i++) {
                newText = wholeTerm[i];
                //console.log(i + " " + j + " " + k + " " + newTerm);
               Din[i][j] += coOccur(newTerm, newText);
                
            }
        }
    }
    for (var i = 0; i < terms.length; i++) {
        for (var j = 0; j < terms.length; j++) {
            D[i][j] = Din[i][j] + Dout[i][j];
            
            if(i==j){D[i][j] =0;} // no self co relation
        }
    }
    // خل 53
    // ظ دم 58
    //bugout.log(coTerms);
    bugout.log(JSON.stringify(D));
    //  bugout.downloadLog();
}

function coOccur(theTerm, theText) {
    var num = 0;
    var m = theText.indexOf(theTerm);
    var lm = theText.lastIndexOf(theTerm);
   // console.log( m + " " + lm)
    if (m != -1 ) {
      num = 1;
      //console.log( " first occur at" + m)
    }
    while (m < lm) {
        //console.log("m = " +m); 
        m = theText.indexOf(theTerm, m + 1);
        num += 1;
    }
    return num;
}