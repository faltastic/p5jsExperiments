var N = 19;
var preWork =[];

var imgCat = [
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    ];

var imgCaption = [
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    "mix cat-1 cat-2",
    "mix cat-4 cat-2",
    "mix cat-3",
    "mix cat-1 cat-4",
    "mix cat-2 cat-3",
    ];

var nPhotos =[
    2,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    2,
    2,
    1,
    1,
    1,
    2,
    2,
    1
];

var extraBase = "p5jsExperiments/huda/en/"

for (var i = 0; i < N-1; i++) {
   preWork[i]={};
   preWork[i]["order"]=(i+1);
   preWork[i]["id"]="pc-"+(i+1);
   preWork[i]["categories"]= imgCat[i];
   preWork[i]["thumb"] = extraBase + "img/all/thumbs/"+ (i +1)+ ".png";
   preWork[i]["nPhotos"]=nPhotos[i];
   preWork[i]["img"] =[];
    for (var j = 0; j < preWork[i]["nPhotos"]; j++) {
        preWork[i]["img"][j] = extraBase + "img/all/"+ (i+1) + "-"+(j+1)+".jpg";
    }
   preWork[i]["caption"] = imgCaption[i] ;

}
