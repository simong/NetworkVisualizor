/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

var Thing = Class.extend({
});

var BadThing = Thing.extend({
    "name" : "BadThing",
    "spreadfactor" : 10,
    "successrate" : 15,
    "invade" : function() {
        var rand = Math.floor(Math.random() * 101)
        return rand > this.successrate;
    }
});

var Virus = BadThing.extend({
    "name" : "Virus",
    "spreadfactor" : 15,
    "successrate" : 70
});


var Machine = Class.extend({
  "setId" : function(id) {
    this.id = id;
  },
  "getId" : function() {
    return this.id;
  },
  
  "setName" : function(name) {
    this.name = name;
  },
  "getName" : function() {
    return this.name;
  },
  
  
  "setType" : function(type) {
    this.type = type;
  },
  "getType" : function() {
    return this.type;
  },
  
  "setAdjacencies" : function(adjacencies) {
    this.adjacencies = adjacencies;
  },
  "getAdjacencies" : function() {
    return this.adjacencies;
  },
  
  
  "getJITRepresentation" : function() {
      return {
      "adjacencies" : this.adjacencies,
      "data": {
        "$color": "#ffffff",
        "$type": this.type
      },
      "id": this.id,
      "name": this.name
    };
  }
});

var Config = Class.extend({
  "getData" : function() {
    return this.data;
  },
  "setData" : function(data) {
      // Store the data.
      this.data = data;
      
      // We want to be sure that our data is sorted alhapeticaly ascending.
      this.data.sort(function(a, b) {
          return a.name > b.name;
      });
  },
  
  "getRunningMachines" : function() {
    return this.data.length;
  },
  
  
  "loadJSON" : function(path, callback) {
    // Make an AJAX call to path
    $.ajax({
      "dataType" : "json",
      "url" : "path",
      "success" : function(data, textStatus, http) {
        // Store our data.
        config.setData(data);
        
        // Execute the callback so something can be done with the fetched data.
        callback(true);
      },
      "error" : function(http, textStatus, error) {
        // We erase any data we might've contained.
        this.data = [];
        
        // Pass on the failure.
        callback(false);
      }
    });
    
  },

  "addMachine" : function(machine) {
    // Create a JIT Node.
    var m = machine.getJITRepresentation();
    
    // Make sure that the data array is always sorted ascending on name!
    // Loop over the array items till we found the correct index to insert our new machine in.
    var i = 0, j = this.data.length
    while (i < j && this.data[i].name < machine.name) {
      i++;   
    }
    
    // Add the machine to the data set on the right position.
    this.data.splice(i, 0, m);
  }
});