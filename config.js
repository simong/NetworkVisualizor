var c = [{
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id0",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id0",
    "name": "Windows XP"
}, {
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id1",
        "data": {}
    },{
        "nodeTo": "id6",
        "nodeFrom": "id1",
        "data": {}
    }],
    "data": {
        "$color": "#00FF00",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id1",
    "name": "MacBook Pro"
}, {
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id2",
        "data": {}
    }],
    "data": {
        "$color": "#00ff00",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id2",
    "name": "Windows 7"
}, {
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id3",
        "data": {}
    },{
        "nodeTo": "id5",
        "nodeFrom": "id3",
        "data": {}
    }],
    "data": {
        "$color": "#00ff00",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id3",
    "name": "Windows Vista - SP2"
}, {
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id4",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id4",
    "name": "Windows XP - SP1"
}, {
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id5",
        "data": {}
    },
    {
        "nodeTo": "id5",
        "nodeFrom": "id3",
        "data": {}
    }],
    "data": {
        "$color": "#00ff00",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id5",
    "name": "Ubuntu"
}, {
    "adjacencies": [{
        "nodeTo": "id1",
        "nodeFrom": "id6",
        "data": {}
    }],
    "data": {
        "$color": "#00ff00",
        "$type": "infected",
        "virussen" : ["trojan"]
    },
    "id": "id6",
    "name": "BSD"
}, {
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id7",
        "data": {}
    },{
        "nodeTo": "id3",
        "nodeFrom": "id7",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id7",
    "name": "Windows ME"
}, {
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id8",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id8",
    "name": "Windows 98"
}, {
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id9",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "infected",
        "virussen" : ["spyware"]
    },
    "id": "id9",
    "name": "Windows ME"
}, {
    "adjacencies": [{
        "nodeTo": "id0",
        "nodeFrom": "id11",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id11",
    "name": "Fedora"
}, {
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id12",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id12",
    "name": "BSD"
}, {
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id13",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id13",
    "name": "Windows ME"
}, {
    "adjacencies": [{
        "nodeTo": "id8",
        "nodeFrom": "id14",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "clean",
        "virussen" : []
    },
    "id": "id14",
    "name": "Windows ME"
}, {
    "adjacencies": [{
        "nodeTo": "id2",
        "nodeFrom": "id15",
        "data": {}
    }],
    "data": {
        "$color": "#ff0000",
        "$type": "infected",
        "virussen" : ["iloveyou","trojan","spyware"]
    },
    "id": "id15",
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
  "naam" : "Sppyware",
  "verspreidingssnelheid" : 20,
  "infectiefactor" : 30,
  "image" : "images/icons/virus/rood.png"
}
];