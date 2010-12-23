var c = [
//  Dit is de voorstelling voor computer met id0 en naam: Windows XP
{
    // De verbindingen die deze computer maakt.
    // nodeFrom is deze computer en nodeTo bevat het id van de computer naar waar de verbinding moet.
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id0"
    }],
    // Bevat wat extra informatie over deze computer
    //   $type: De toestand van de computer: clean, infected, internet_clean, internet_infected
    //   virussen: Een lijst van virussen die zich op deze computer bevinden. 
    //			   Dit is een array van strings, waarbij iedere string het id van een SlechtBestand is.
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    // Het id van deze computer.
    "id": "id0",
    // De naam van de computer.
    "name": "Windows XP"
}, 

//  Computer met id1...
{
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id1"
    },{
        "nodeTo": "id6",
        "nodeFrom": "id1"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id1",
    "name": "MacBook Pro"
},
{
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id2"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id2",
    "name": "Windows 7"
},
{
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id3"
        
    },{
        "nodeTo": "id5",
        "nodeFrom": "id3"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id3",
    "name": "Windows Vista - SP2"
},
{
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id4"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id4",
    "name": "Windows XP - SP1"
},
{
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id5"
        
    },
    {
        "nodeTo": "id5",
        "nodeFrom": "id3"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id5",
    "name": "Ubuntu"
},
{
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id6"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id6",
    "name": "BSD"
},
{
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id7"
        
    },{
        "nodeTo": "id3",
        "nodeFrom": "id7"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id7",
    "name": "Windows ME"
},
{
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id8"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id8",
    "name": "Windows 98"
},
{
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id9"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id9",
    "name": "Windows ME"
},
{
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id11"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id11",
    "name": "Fedora"
},
{
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id12"
        
    }],
    "data": {
        "$type": "internet_infected",
        "virussen" : ["iloveyou"]
    },
    "id": "id12",
    "name": "BSD"
},
{
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id13"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id13",
    "name": "Windows ME"
},
{
    "adjacencies": [{
        "nodeTo": "id8",
        "nodeFrom": "id14"
        
    }],
    "data": {
        "$type": "internet_infected",
        "virussen" : ["trojan", "spyware"]
    },
    "id": "id14",
    "name": "Windows ME"
},
{
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id15"
        
    }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id15",
    "name": "Windows ME"
},
{
      "adjacencies": [{
        "nodeTo": "id4",
        "nodeFrom": "id1"
        
      }, {
        "nodeTo": "id15",
        "nodeFrom": "id10"
        
      }],
    "data": {
        "$type": "clean",
        "virussen" : []
    },
    "id": "id10",
    "name": "Windows ME"
}];

var virussen = [
{
  "id" : "iloveyou",
  "naam" : "I<3Virus",
  "verspreidingssnelheid" : 20,
  "infectiefactor" : 30,
  "image" : "images/icons/virus/oranje.png"
},
{
  "id" : "trojan",
  "naam" : "Trojan",
  "verspreidingssnelheid" : 20,
  "infectiefactor" : 30,
  "image" : "images/icons/virus/paars.png"
},
{
  "id" : "spyware",
  "naam" : "Spyware",
  "verspreidingssnelheid" : 20,
  "infectiefactor" : 30,
  "image" : "images/icons/virus/rood.png"
}
];
