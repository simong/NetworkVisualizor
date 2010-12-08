/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){
        xyz;
    }) ? /\b_super\b/ : /.*/;
    
    // The base Class implementation (does noBestand)
    this.Class = function(){
    };
    
    // Create a new Class that inherits from this class
    Class.extend = function(prop){
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
            typeof _super[name] == "function" &&
            fnTest.test(prop[name]) ? (function(name, fn){
                return function(){
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
            })(name, prop[name]) : prop[name];
        }
        
        // The dummy class constructor
        function Class(){
            // All construction is actually done in the init method
            if (!initializing && this.init) 
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

var Bestand = Class.extend({});

var SlechtBestand = Bestand.extend({
    "name": "SlechtBestand",
    "spreadfactor": 10,
    "successrate": 15,
    "invade": function(){
        var rand = Math.floor(Math.random() * 101)
        return rand > this.successrate;
    }
});

var Virus = SlechtBestand.extend({
    "init" : function(naam, verspreidingSnelheid, infectieFactor) {
        this.setNaam(naam);
        this.setVerspreidingSnelheid(verspreidingSnelheid);
        this.setInfectieFactor(infectieFactor);
    },
    
    
    "setNaam": function(naam){
        this.naam = naam;
    },
    "getNaam": function(){
        return this.naam;
    },
    
    
    "setVerspreidingSnelheid": function(verspreidingSnelheid){
        this.verspreidingSnelheid = verspreidingSnelheid;
    },
    "getVerspreidingSnelheid": function(){
        return this.verspreidingSnelheid;
    },
    
    
    "setInfectieFactor": function(infectieFactor){
        this.infectieFactor = infectieFactor;
    },
    "getInfectieFactor": function(){
        return this.infectieFactor;
    }
});











var Computer = Class.extend({
    "setId": function(id){
        this.id = id;
    },
    "getId": function(){
        return this.id;
    },
    
    "setNaam": function(naam){
        this.naam = naam;
    },
    "getNaam": function(){
        return this.naam;
    },
    
    
    "setType": function(type){
        this.type = type;
    },
    "getType": function(){
        return this.type;
    },
    
    "setAdjacencies": function(adjacencies){
        this.adjacencies = adjacencies;
    },
    "getAdjacencies": function(){
        return this.adjacencies;
    },
    
    
    "getJITRepresentation": function(){
        return {
            "adjacencies": this.adjacencies,
            "data": {
                "$color": "#00ff00",
                "$type": this.type
            },
            "id": this.id,
            "name": this.naam
        };
    }
});













var Config = Class.extend({
    /**
     * Get the entire config.
     */
    "getData": function(){
        return this.data;
    },
    
    
    /**
     * Set a config. YOU will have to ensure that is in the right format!
     */
    "setData": function(data){
        // Store the data.
        this.data = data;
        
        // We want to be sure that our data is sorted alhapeticaly ascending.
        this.data.sort(function(a, b){
            return a.name > b.name;
        });
    },
    
    
    /**
     * Returns the number of Computers that are currently running.
     */
    "getRunningComputers": function(){
        return this.data.length;
    },
    
    /**
     * Load a config from a remote location.
     * @param path The relative path where the config file is located.
     * @param callback A callback function that will be executed when the HTTP request is done. It will be called with the following parameters: data, HTTP status code, http object
     */
    "loadJSON": function(path, callback){
        // Make an AJAX call to path
        $.ajax({
            "dataType": "json",
            "url": "path",
            "success": function(data, textStatus, http){
                // Store our data.
                config.setData(data);
                
                // Execute the callback so someBestand can be done with the fetched data.
                callback(true);
            },
            "error": function(http, textStatus, error){
                // We erase any data we might've contained.
                this.data = [];
                
                // Pass on the failure.
                callback(false);
            }
        });
    },
    
    
    
    /**
     * Adds a Computer to the config.
     * @param Computer the Computer object that should be added.
     */
    "addComputer": function(Computer){
        // Create a JIT Node.
        var m = Computer.getJITRepresentation();
        
        // Make sure that the data array is always sorted ascending on name!
        // Loop over the array items till we found the correct index to insert our new Computer in.
        var i = 0, j = this.data.length
        while (i < j && this.data[i].name < Computer.name) {
            i++;
        }
        
        // Add the Computer to the data set on the right position.
        this.data.splice(i, 0, m);
    },
    
    /**
     * Get the Computer with a certain id.
     * @param {Object} id The ID of the Computer.
     * @return The Computer.
     */
    "getComputer": function(id){
        // Because our data set is sorted, we simply loop over them while 
        // the id is smaller than the searched id.
        var i = 0;
        while (this.data[i].id < id) {
            i++;
        }
        
        // Check if we have the correct one.
        if (this.data[i].id === id) {
            return this.data[i];
        }
        
        return null;
    }
});


var BeheerSysteem = Class.extend({

    /**
     * Sets the drawer mechanisme that can be used to draw.
     * @param {Object} fd
     */
    "setDrawer": function(fd){
        this.fd = fd;
    },
    
    /**
     * Set the config
     * @param {Object} config an object of type Config
     */
    "setConfig": function(config){
        this.config = config;
    },
    
    
    "getRunningComputers" : function() {
      return this.config.getRunningComputers();
    },
    
    /**
     * @param Computer An object of type Computer that needs to be wiped.
     * @param fd The object to draw with.
     */
    "wipeComputer": function(id){
        // Model part
        var Computer = this.getComputer(id);
        // TODO
        // Computer.wipe();
        
        // Graph part:
        // Get the Node object.
        var node = this.fd.graph.getNode(id);
        
        // Change the type of the Computer to clean.
        node.setData("color", "#00ff00", "current");
        
        // Replot the nodes.
        fd.plot();
    },
    
    
    "deleteComputer": function(id){
        // Get the node
        var node = this.fd.graph.nodes[id];
        
        // Check if that node has more than 1 adjacent node.
        var i = 0;
        $jit.Graph.Util.eachAdjacency(node, function(adj){
            i++;
        });
        
        if (i > 1) {
            alert("Cannot delete this node!");
        }
        else {
            // Delete it.
            //  Actually we're only hiding it here..
            
            node.setData('alpha', 0, 'end');
            node.setData('alpha', 0, 'end');
            node.eachAdjacency(function(adj){
                adj.setData('alpha', 0, 'end');
            });
            fd.fx.animate({
                modes: ['node-property:alpha', 'edge-property:alpha'],
                duration: 500
            });
            
            
            /*
             * Alternative, but the labels are acting quirky.
             fd.graph.removeNode(id);
             fd.plot();
             */
        }
    },
    
    "addComputer": function(Computer){
        // Add it to our config.
        config.addComputer(Computer);
        
        // Create the node.
        fd.graph.addNode(Computer.getJITRepresentation());
        // Get the newly created node.
        var newNode = fd.graph.getNode(Computer.getId());
        // Get the associated node.
        var assocNode = fd.graph.getNode(Computer.getAdjacencies()[0].nodeTo);
        
        // Add the association
        fd.graph.addAdjacence(newNode, assocNode, {});
        
        // Compute and plot the graph.
        //fd.compute('end');
        //fd.plot();
        
        //fd.fx.plotNode(newNode, fd.canvas, {});
        
        
        $jit.ForceDirected.Plot.prototype.plotNode(newNode, fd.canvas, {});
        
    },
    
    /**
     * Returns the Computer with the specified id.
     * Basiscally a wrapper around config.getComputer.
     * @param {Object} id
     */
    "getComputer": function(id){
        return this.config.getComputer(id);
    },
    
    
    "stuurBericht" : function() {
        // een paar "random" nodes.
        var pcs = [];
        var aantal = beheerSysteem.getRunningComputers();
        
        // We kiezen ongeveer 1/3e van de pc's die een bericht zal versturen.
        var interacties = aantal / 2;
        for (var i = 0; i < interacties;i++) {
          // Kies een random computer.
          var r = Math.floor(Math.random() * aantal)
          var fromNode = fd.graph.getNode("id" + r);
          
          // Kies een van de verbindingen.
          var toNode = null;
          fromNode.eachAdjacency(function(adj){
                  if (adj.nodeFrom.id == fromNode.id) {
                    toNode = adj.nodeTo;
                  }
                  else {
                    toNode = adj.nodeFrom;
                  }
              });
          
          // De posities
          var from = fromNode.getPos();
          var to = toNode.getPos();
          
          // De stapjes die we moeten zetten.
          var xStep = (to.x - from.x) / 10;
          var yStep = (to.y - from.y) / 10;
          
          // TODO kies een bestand
          // var teverzendenBestand = computer.stuurBestand();
          
          var data = {
            "from" : { "x" : from.x, "y" : from.y },
            "xStep" : xStep,
            "yStep" : yStep
          }
          
          // Sla dit alles op in een structuur.
          pcs.push(data);
        }
        
        
        /**
         * Tekent een cirkeltje.
         */
        function drawMessage(from, xStep, yStep) {
          var pos = {
            "x" : from.x,
            "y" : from.y
          }
          
          // Teken een cirkel
          fd.canvas.getCtx().fillStyle = "rgb(255,0,0)"; 
          fd.fx.nodeHelper.circle.render('fill', pos, 5, fd.canvas)
        }
        
        /**
         * Tekent al de cirkels en roept zichzelf 10x op.
         */
        function drawAllMessages(data, count) {
          // We doen maar 10 stapjes
          if (count <= 10) {
            fd.plot();
            
            for (var i = 0, j = data.length; i < j;i++) {
              drawMessage(data[i]["from"], data[i]["xStep"], data[i]["yStep"]);
              data[i]["from"]["x"] += data[i]["xStep"];
              data[i]["from"]["y"] += data[i]["yStep"];
            }
            
            // Roep deze functie nog eens op, zodat de circkel opschuift.
            setTimeout(function() { drawAllMessages(data, count+1); }, 80)
          } else {
            // Animaties zijn afgelopen.
            fd.plot();
          }
        }
        
        drawAllMessages(pcs, 0);
    },

    /**
     * Toon informatie over een willekeurige computer
     */
    "showRandomInfo": function(){

        var randomNodeId; // Een willekeurige id van een node
        var currentNodeId; // De id van de huidig geselecteerde node

        // De setinverval functie zal op een vast ingesteld aantal seconden uitgevoerd worden
        setInterval(function() {

            // Zorg ervoor dat we enkel een nodenummer selecteren dat bestaat
            randomNodeId = c[Math.floor(Math.random()*c.length)].id;

            if(randomNodeId !== currentNodeId) {
                $("#" + randomNodeId + " .name").trigger("click");
                currentNodeId = randomNodeId;
            }

        }, 3000);

    }

});