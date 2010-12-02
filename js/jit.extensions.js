(function(){
    var img_pc_infected = new Image();
    img_pc_infected.src = "images/icons/infected.png";
    var img_pc_clean = new Image();
    img_pc_clean.src = "images/icons/clean.png";
    
    
    //  NodeTypes
    
    $jit.ForceDirected.Plot.NodeTypes.implement({
        'infected': {
            'render': function(node, canvas){
                canvas.getCtx().drawImage(img_pc_infected, node.endPos.x - 15, node.endPos.y - 30);
            },
            'contains': function(node, pos){
                return ((pos.x >= node.endPos.x && pos.x <= node.endPos.x + 55) &&
                (pos.y >= node.endPos.y && pos.y <= node.endPos.y + 80));
            }
        }
    });
    
    $jit.ForceDirected.Plot.NodeTypes.implement({
        'clean': {
            'render': function(node, canvas){
                canvas.getCtx().drawImage(img_pc_clean, node.endPos.x - 15, node.endPos.y - 30);
            },
            'contains': function(node, pos){
                return ((pos.x >= node.endPos.x && pos.x <= node.endPos.x + 33) &&
                (pos.y >= node.endPos.y && pos.y <= node.endPos.y + 61));
            }
        }
    });
    
    
    
    //  Edge types (lijntjes)
    $jit.ForceDirected.Plot.EdgeTypes.implement({  
        'pulsing': {  
          'render': function(adj, canvas) {  
            var ctx = canvas.getCtx();
            // invert edge direction
            if (swap) {
              var tmp = from;
              from = to;
              to = tmp;
            }
            var vect = new Complex(to.x - from.x, to.y - from.y);
            vect.$scale(dim / vect.norm());
            var intermediatePoint = new Complex(to.x - vect.x, to.y - vect.y),
                normal = new Complex(-vect.y / 2, vect.x / 2),
                v1 = intermediatePoint.add(normal), 
                v2 = intermediatePoint.$add(normal.$scale(-1));
            
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.lineTo(to.x, to.y);
            ctx.closePath();
            ctx.fill();
          },  
          //optional  
          'contains': function(adj, pos) {  
            //return true if pos is inside the arc or false otherwise  
          }  
        }  
      });
    
})();