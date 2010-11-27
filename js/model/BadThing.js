var BadThing = Thing.extend({
    "name" : "BadThing",
    "spreadfactor" : 10,
    "successrate" : 15,
    "invade" : function() {
        var rand = Math.floor(Math.random() * 101)
        return rand > this.successrate;
    }
    
});