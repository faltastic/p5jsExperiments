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
    "Mashrabiyya Dolls <br /> paper cut outs , acrylic (230 x 300 cm) 2006",
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
/*
1- Title: Mashrabiyya Dolls
	 paper cut outs , acrylic (230 x 300 cm) 2006

2- Title: Mulid Dolls
	Size: 210 x 175 x 135 cm
	Medium: synthetic resin, wood, lights
	Year: 2006

3- Title: The Masha Labyrinth
	Size: 180 x 210 cm x 2
	Medium:  steenles steel masha dolls, wood
	Year: 2006

4- Title: The Other
	Size: 172 x 40 x 12 cm; 165 x 38 x 11 cm
	Medium: Enlarged aluminum masha dolls, wall text, broken mirror.
	Year: 2007

5- Title: Bounty Dolls
	Size 170 x 45 x 75 cm
	Medium: stuffed fabric dolls, acrylic, text
	Year: 2006

6- Title: Mandala (Clogs of al-sitt)
	Size: 200 cm diameter
	Medium: wooden clogs, acrylic
	Year: 2006

7- Title: To the Children of Africa
	Size: 180 x 95 x 5 cm
	Medium: Vintage dolls, wood
	Year: 2006

8- Title: To the Children of Africa (detail)

8a- Title: Sitting on the Ladder
	Size: 190 x 130 x 6 cm
	Medium: Stuffed dolls, fabric, acrylic, wood
	Year: 2006

8b-	Title: Sitting on the Ladder (detail)

9- Title: Energy
	Size: 200 cm diameter
	Medium: synthetic resin, electric lights
	Year: 2010

10- Title: Circle of Silence
	Size: 70 cm diameter
	Medium: wooden moulds, white fabric,
	Year: 2003

11- Title: Carpet of Remembrance
	Size: 200 x 180 cm
	Medium: wooden moulds, acrylic, text, mirror
	Year: 2003

12- Title: Carpet of Remembrance (detail)

13- Title: Elusive Kingship
	Size: 105 x 16 x 5 cm x 2
	Medium: wooden crutches, acrylic, plastic toy
	Year: 2010
14- Title: Elusive Kingship (detail)

15- Title: House Bound
	Size: 63 x 39 x 16 cm x2
	Medium: mannequin legs, photo collage
	Year: 2008

16- Title: Zan’a
	Size: 14 heads, 35  x 14 x 16 cm each
	Medium: synthetic resin, electric lights
	Year: 2008

17- Title: Stripping off the Garments
	Size: 110 x 110 cm
	Medium: perfume bottles, white fabric, black violet light, wood
	Year: 2010

18- Title: Stripping off the Garments (detail)

19- Title: Obelisk
	Size: 80 x 80 x 200 cm
	Medium: wood, acrylic, text, photo collage
	Year: 2010

20- The Perfumed Garden
	Size: 120 x 190 x 12 cm
	Medium: recycled perfume bottles, hand painted photos, wood
	Year: 2008

21- The Perfumed Garden (detail)

22- The Perfumed Garden (detail)

23- Cactus Feet, Cactus Crutches (detail)
	Size: Variable Sizes
	Medium: Printed canvas, wood, synthetic resin
	Year: 2015
*/



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
