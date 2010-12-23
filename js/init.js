var labelType, useGradients, nativeTextSupport, animate, nrOfNodes, fd, beheerSysteem;

(function(){
    var ua = navigator.userAgent, iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i), typeOfCanvas = typeof HTMLCanvasElement, nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'), textSupport = nativeCanvasSupport &&
    (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
})();

function loadNetwork(success){
    if (success) {

        // init ForceDirected
        fd = new $jit.ForceDirected({
            //id of the visualization container
            injectInto: 'network_graph',
            //Enable zooming and panning
            //with scrolling and DnD
            Navigation: {
                enable: false,
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
                type: 'line',
                color: '#225772'
            },
            // Add node events
            Events: {
                enable: true,
                type: 'Native'
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
                var nameContainer = document.createElement('a'), style = nameContainer.style;

                nameContainer.className = 'name';
                nameContainer.innerHTML = node.name;
                nameContainer.style.display = "none";
                domElement.appendChild(nameContainer);
                style.fontSize = "0.8em";
                style.color = "#ddd";

                //Toggle a node selection when clicking
                //its name. This is done by animating some
                //node styles like its dimension and the color
                //and lineWidth of its adjacencies.
                nameContainer.onclick = function(){
                    //set final styles
                    fd.graph.eachNode(function(n){
                        if (n.id != node.id)
                            delete n.selected;
                        n.setData('dim', 7, 'end');
                        n.eachAdjacency(function(adj){
                            adj.setDataset('end', {
                                lineWidth: 0.4,
                                color: '#23a4ff'
                            });
                        });
                    });
                    if (!node.selected) {
                        node.selected = true;
                        node.setData('dim', 17, 'end');
                        node.eachAdjacency(function(adj){
                            adj.setDataset('end', {
                                lineWidth: 3,
                                color: '#36acfb'
                            });
                        });
                    }
                    else {
                        delete node.selected;
                    }
                    //trigger animation to final styles
                    fd.fx.animate({
                        modes: ['node-property:dim', 'edge-property:lineWidth:color'],
                        duration: 5
                    });

                    // Show some details
                    $("#inner-details").fadeTo(250, 0.0, function(){
                        $("#inner-details-name").text(node.name);
                        $("#inner-details-id").text(node.id);

                        // Build the right column relations list.
                        // This is done by traversing the clicked node connections.
                        var list = "";
                        node.eachAdjacency(function(adj){
                            if (adj.getData('alpha'))
                                list += "<li>" + adj.nodeTo.name + "</li>";
                        });
                        //append connections information
                        $('#inner-details-connections').html(list);
                        
                        // Virus informatie
                        var computer = beheerSysteem.getComputer(node.id);
                        var virussen = "";
                        if (computer.getBestanden().length === 0) {
                            virussen = "<li>Virus vrij</li>";
                        }
                        else {
                            for (var i = 0; i < computer.getBestanden().length; i++) {
                                virussen += "<li>" + computer.getBestanden()[i].getNaam() + "</li>";
                            }
                        }
                        $('#inner-details-virussen').html(virussen);
                        $('#inner-details').height(120 + $("#inner-details-connections").height() + $("#inner-details-virussen").height());
                        $('#inner-details').fadeTo(250, 0.5);
                    });
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
                style.top = (top + 10) + 'px';
                style.display = '';
            }
        });
        // load JSON data.
        fd.loadJSON(config.getData());
        // compute positions incrementally and animate.
        fd.computeIncremental({
            iter: 40,
            property: ['end', 'start', 'current'],
            onStep: function(perc){
            },
            onComplete: function(){
                fd.plot();
            }
        });

        // Keep the fd!
        beheerSysteem.setDrawer(fd);
	    beheerSysteem.showRandomInfo();

        // Start het versturen van berichten.
        // Dit wordt iedere 5 seconden opgeroepen.
        // TODO verzet naar iets langer voor demo.
        setInterval(function() { beheerSysteem.stuurBericht(); }, 5000);
	    // Slechte bestanden op een computer wissen
	    setInterval(function() { beheerSysteem.wipeComputer(); }, 10000);
        // Voeg iedere 15 seconden een computer toe.
        setInterval(function() { try { beheerSysteem.addComputer(); } catch (x) { } }, 15000);

        // Verwijder iedere 15 seconden een computer (maar wacht eerst 1x 6 seconden zodat we niet tegelijk
        // een toevoegen en dan een verwijderen.)
    	setTimeout(function() { setInterval(function() { try {  beheerSysteem.deleteComputer(); } catch (x) { } }, 15000); }, 2000 );
        
        // Na 10 minuten refreshen we het window.
        // Zodat we mooie grafieken en memory leaks tegengaan.
        setTimeout(function() { window.location.reload(true); }, 600000);
    }
    else {
        alert("Failed to load the config file. (" + status + ")");
    }
}


function init(){
    // Load all the data.
    config = new Config();
    //config.loadJSON("config.js", loadNetwork);
    config.setVirussen(virussen);
    config.setData(c);

    beheerSysteem = new BeheerSysteem();
    beheerSysteem.setConfig(config);

    loadNetwork(true);


    // ###############
    // The UI events #
    // ###############
}
