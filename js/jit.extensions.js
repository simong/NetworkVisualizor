(function(){
  var img_pc_infected = new Image();
  img_pc_infected.src = "images/icons/infected.png";
  var img_pc_clean = new Image();
  img_pc_clean.src = "images/icons/clean.png";
  
   $jit.ForceDirected.Plot.NodeTypes.implement({  
   'infected': {  
     'render': function(node, canvas) {  
       //print your custom node to canvas
       canvas.getCtx().drawImage(img_pc_infected, node.endPos.x-15, node.endPos.y-30);
      //var ctx = canvas.getCtx();
      //ctx.beginPath();
      //ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
      //ctx.closePath();
      //ctx[type]();
       
     },  
     //optional  
     'contains': function(node, pos) {  
       //return true if pos is inside the node or false otherwise
       return false;
     }  
   }  
 }); 
  
    
   $jit.ForceDirected.Plot.NodeTypes.implement({  
   'clean': {  
     'render': function(node, canvas) {  
       //print your custom node to canvas
       canvas.getCtx().drawImage(img_pc_clean, node.endPos.x-15, node.endPos.y-30);
      //var ctx = canvas.getCtx();
      //ctx.beginPath();
      //ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
      //ctx.closePath();
      //ctx[type]();
       
     },  
     //optional  
     'contains': function(node, pos) {  
       //return true if pos is inside the node or false otherwise
       return false;
     }  
   }  
 });
 
 })();