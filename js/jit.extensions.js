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
    
})();