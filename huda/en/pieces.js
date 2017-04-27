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
    "Mashrabiyya Dolls - paper cut outs , acrylic (230 x 300 cm) 2006",
    "Mulid Dolls - synthetic resin, wood, lights (210 x 175 x 135 cm) 2006",
    "The Masha Labyrinth - steenles steel masha dolls, wood (180 x 210 cm x 2) 2006",
    "The Other - Enlarged aluminum masha dolls, wall text, broken mirror (172 x 40 x 12 cm; 165 x 38 x 11 cm) 2007",
    "Bounty Dolls - stuffed fabric dolls, acrylic, text (170 x 45 x 75 cm) 2006",
    "Mandala (Clogs of al-sitt) - wooden clogs, acrylic (200 cm diameter) 2006",
    "To the Children of Africa - Vintage dolls, wood (180 x 95 x 5 cm) 2006",
    "Sitting on the Ladder - stuffed dolls, fabric, acrylic, wood (190 x 130 x 6 cm) 2006",
    "Energy - synthetic resin, electric lights (200 cm diameter) 2010",
    "Circle of Silence - wooden moulds, white fabric (70 cm diameter) 2003",
    "Carpet of Remembrance - wooden moulds, acrylic, text, mirror (200 x 180 cm) 2003",
    "Elusive Kingship - wooden crutches, acrylic, plastic toy (105 x 16 x 5 cm x 2) 2010",
    "House Bound - mannequin legs, photo collage (63 x 39 x 16 cm x 2) 2008",
    "Zan’a - synthetic resin, electric lights (14 heads, 35  x 14 x 16 cm each) 2008",
    "Stripping off the Garments - perfume bottles, white fabric, black violet light, wood (110 x 110 cm) 2010 ",
    "Obelisk - wood, acrylic, text, photo collage (80 x 80 x 200 cm) 2010",
    "The Perfumed Garden - recycled perfume bottles, hand painted photos, wood (120 x 190 x 12 cm) 2008",

    "Cactus Feet, Cactus Crutches - printed canvas, wood, synthetic resin (variable sizes) 2015"
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

var extraBase = "https://raw.githubusercontent.com/faltastic/p5jsExperiments/gh-pages/huda/en/";

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
