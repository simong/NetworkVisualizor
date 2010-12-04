/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){
        xyz;
    }) ? /\b_super\b/ : /.*/;
    
    // The base Class implementation (does nothing)
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

var Thing = Class.extend({});

var BadThing = Thing.extend({
    "name": "BadThing",
    "spreadfactor": 10,
    "successrate": 15,
    "invade": function(){
        var rand = Math.floor(Math.random() * 101)
        return rand > this.successrate;
    }
});

var Virus = BadThing.extend({
    "name": "Virus",
    "spreadfactor": 15,
    "successrate": 70
});











var Machine = Class.extend({
    "setId": function(id){
        this.id = id;
    },
    "getId": function(){
        return this.id;
    },
    
    "setName": function(name){
        this.name = name;
    },
    "getName": function(){
        return this.name;
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
            "name": this.name
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
     * Returns the number of machines that are currently running.
     */
    "getRunningMachines": function(){
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
                
                // Execute the callback so something can be done with the fetched data.
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
     * Adds a machine to the config.
     * @param machine the Machine object that should be added.
     */
    "addMachine": function(machine){
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
    },
    
    /**
     * Get the machine with a certain id.
     * @param {Object} id The ID of the machine.
     * @return The machine.
     */
    "getMachine": function(id){
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


var MonitorSystem = Class.extend({

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
    
    
    
    /**
     * @param machine An object of type Machine that needs to be wiped.
     * @param fd The object to draw with.
     */
    "wipeMachine": function(id){
        // Model part
        var machine = this.getMachine(id);
        // TODO
        // machine.wipe();
        
        // Graph part:
        // Get the Node object.
        var node = this.fd.graph.getNode(id);
        
        // Change the type of the machine to clean.
        node.setData("color", "#00ff00", "current");
        
        // Replot the nodes.
        fd.plot();
    },
    
    
    "deleteMachine": function(id){
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
    
    "addMachine" : function(machine){
        // Add it to our config.
        config.addMachine(machine);
        
        // Create the node.
        fd.graph.addNode(machine.getJITRepresentation());
        // Get the newly created node.
        var newNode = fd.graph.getNode(machine.getId());
        // Get the associated node.
        var assocNode = fd.graph.getNode(machine.getAdjacencies()[0].nodeTo);
        
        // Add the association
        fd.graph.addAdjacence(newNode, assocNode, {});
        
        // Compute and plot the graph.
        //fd.compute('end');
        //fd.plot();
        
        //fd.fx.plotNode(newNode, fd.canvas, {});
        
        
        $jit.ForceDirected.Plot.prototype.plotNode(newNode, fd.canvas, {});
        
    },
    
    /**
     * Returns the machine with the specified id.
     * Basiscally a wrapper around config.getMachine.
     * @param {Object} id
     */
    "getMachine": function(id){
        return this.config.getMachine(id);
    }
    
    
});
