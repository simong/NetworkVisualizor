var labelType, useGradients, nativeTextSupport, animate, nrOfNodes, fd;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();


/**
 * Update the combobox with the current computers
 * @returns {void} 
 * @type String|Object|Array|Boolean|Number
 */
var updatecombobox = function(){
  
  // jQuery selector for the select box
  var $selectbox = $("#machine_connected_0");
  $selectbox.html("");
  
  for(var i = 0; i < config.length; i++){
    var configelement = config[i];
    
    $selectbox.append("<option value='" + configelement.id + "'>" + configelement.name +"</option>")
  }
}


function init(){
  // init data
  
 var json = config;
 nrOfNodes = config.length;
 
 updatecombobox();
  // end
  
  
  // init ForceDirected
  fd = new $jit.ForceDirected({
    //id of the visualization container
    injectInto: 'network_graph',
    //Enable zooming and panning
    //with scrolling and DnD
    Navigation: {
      enable: true,
      //Enable panning events only if we're dragging the empty
      //canvas (and not a node).
      panning: 'avoid nodes',
      zooming: 10 //zoom speed. higher is more sensible
    },
    // Change node and edge styles such as
    // color and width.
    // These properties are also set per node
    // with dollar prefixed data-properties in the
    // JSON structure.
    Node: {
      overridable: true,
      dim: 7
    },
    Edge: {
      overridable: true,
      color: '#23A4FF',
      lineWidth: 0.4
    },
    // Add node events
    Events: {
      enable: true,
      type: 'Native',
      //Change cursor style when hovering a node
      onMouseEnter: function() {
        fd.canvas.getElement().style.cursor = 'move';
      },
      onMouseLeave: function() {
        fd.canvas.getElement().style.cursor = '';
      },
      //Update node positions when dragged
      onDragMove: function(node, eventInfo, e) {
        var pos = eventInfo.getPos();
        node.pos.setc(pos.x, pos.y);
        fd.plot();
      },
      //Implement the same handler for touchscreens
      onTouchMove: function(node, eventInfo, e) {
        $jit.util.event.stop(e); //stop default touchmove event
        this.onDragMove(node, eventInfo, e);
      }
    },
    //Number of iterations for the FD algorithm
    iterations: 200,
    //Edge length
    levelDistance: 130,
    // This method is only triggered
    // on label creation and only for DOM labels (not native canvas ones).
    onCreateLabel: function(domElement, node){
      // Create a 'name' and 'close' buttons and add them
      // to the main node label
      var nameContainer = document.createElement('a'),
          style = nameContainer.style;
          
          
      nameContainer.className = 'name';
      nameContainer.innerHTML = node.name;
      domElement.appendChild(nameContainer);
      style.fontSize = "0.8em";
      style.color = "#ddd";
     
      //Toggle a node selection when clicking
      //its name. This is done by animating some
      //node styles like its dimension and the color
      //and lineWidth of its adjacencies.
      nameContainer.onclick = function() {
        //set final styles
        fd.graph.eachNode(function(n) {
          if(n.id != node.id) delete n.selected;
          n.setData('dim', 7, 'end');
          n.eachAdjacency(function(adj) {
            adj.setDataset('end', {
              lineWidth: 0.4,
              color: '#23a4ff'
            });
          });
        });
        if(!node.selected) {
          node.selected = true;
          node.setData('dim', 17, 'end');
          node.eachAdjacency(function(adj) {
            adj.setDataset('end', {
              lineWidth: 3,
              color: '#36acfb'
            });
          });
        } else {
          delete node.selected;
        }
        //trigger animation to final styles
        fd.fx.animate({
          modes: ['node-property:dim',
                  'edge-property:lineWidth:color'],
          duration: 500
        });
        // Build the right column relations list.
        // This is done by traversing the clicked node connections.
        var html = "<h4>" + node.name + "</h4><b> connections:</b><ul><li>",
            list = [];
        node.eachAdjacency(function(adj){
          if(adj.getData('alpha')) list.push(adj.nodeTo.name);
        });
        //append connections information
        $jit.id('inner-details').innerHTML = html + list.join("</li><li>") + "</li></ul>";
      };
    },
    // Change node styles when DOM labels are placed
    // or moved.
    onPlaceLabel: function(domElement, node){
      var style = domElement.style;
      var left = parseInt(style.left);
      var top = parseInt(style.top);
      var w = domElement.offsetWidth;
      style.left = (left - w / 2) + 'px';
      style.top = (top + 40) + 'px';
      style.display = '';
    }
  });
  // load JSON data.
  fd.loadJSON(json);
  // compute positions incrementally and animate.
  fd.computeIncremental({
    iter: 40,
    property: ['end', 'start', 'current'],
    onStep: function(perc){
  },
    onComplete: function(){
      fd.animate({
        modes: ['linear'],
        transition: $jit.Trans.Elastic.easeOut,
        duration: 2500
      });
    }
  });
  // end
  
  
  // Fancy slider things
  $(".menu_bar").bind("click", function() {
    // FIXME
    $(".panel", $(this).parents(".subcontainer")).slideToggle();
  });
  
  
  // Start the freaky heap thing.
  
  
  // Add button
  $("#machine_add").live("click", function() {
    nrOfNodes++;
    
    var name = $("#machine_name").val();
    
    var $selectbox = $("#machine_connected_0");
    
    var data = {
      "adjacencies" : [
        {
          "nodeTo" : $selectbox.val(),
          "nodeFrom" : "graphnode" + nrOfNodes,
          "data" : {}
        }
      ],
      "data": {  
        "$color": "#83548B",   
        "$type": "clean"  
      },   
      "id": "graphnode" + nrOfNodes,   
      "name": name  
    };
    config.push(data);
    
    fd.op.morph(config, {
                        "type":"nothing",
                        "duration" : 2500,
                        "fps":35,
                        "transition":$jit.Trans.linear,
                        "hideLabels":true
                      });
    fd.refresh();
    fd.animate({
        modes: ['linear'],
        transition: $jit.Trans.Elastic.easeOut,
        duration: 2500
      });
  });
}
