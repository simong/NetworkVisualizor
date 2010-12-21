(function(){
    var img_pc_infected = new Image();
    img_pc_infected.src = "images/icons/pc_infected.png";
    var img_pc_clean = new Image();
    img_pc_clean.src = "images/icons/pc_clean.png";
    
    var img_internet_pc_infected = new Image();
    img_internet_pc_infected.src = "images/icons/pc_internet_infected.png";
    var img_internet_pc_clean = new Image();
    img_internet_pc_clean.src = "images/icons/pc_internet_clean.png";
    
    //  NodeTypes
    $jit.ForceDirected.Plot.NodeTypes.implement({
        'infected': {
            'render': function(node, canvas){
                //canvas.getCtx().drawImage(img_pc_clean, node.endPos.x - 16, node.endPos.y - 16);
                var pos = node.pos.getc(true);
                canvas.getCtx().drawImage(img_pc_infected, pos.x - 18, pos.y - 18);
            },
            'contains': function(node, pos){
                return ((pos.x >= node.endPos.x && pos.x <= node.endPos.x + 36) &&
                (pos.y >= node.endPos.y && pos.y <= node.endPos.y + 36));
            }
        }
    });
    
    $jit.ForceDirected.Plot.NodeTypes.implement({
        'clean': {
            'render': function(node, canvas){
                //canvas.getCtx().drawImage(img_pc_clean, node.endPos.x - 16, node.endPos.y - 16);
                var pos = node.pos.getc(true);
                canvas.getCtx().drawImage(img_pc_clean, pos.x - 18, pos.y - 18);
            },
            'contains': function(node, pos){
                return ((pos.x >= node.endPos.x && pos.x <= node.endPos.x + 36) &&
                (pos.y >= node.endPos.y && pos.y <= node.endPos.y + 36));
            }
        }
    });
   
    $jit.ForceDirected.Plot.NodeTypes.implement({
        'internet_infected': {
            'render': function(node, canvas){
                var pos = node.pos.getc(true);
                canvas.getCtx().drawImage(img_internet_pc_infected, pos.x - 18, pos.y - 18);
            },
            'contains': function(node, pos){
                return ((pos.x >= node.endPos.x && pos.x <= node.endPos.x + 36) &&
                (pos.y >= node.endPos.y && pos.y <= node.endPos.y + 36));
            }
        }
    });

    $jit.ForceDirected.Plot.NodeTypes.implement({
        'internet_clean': {
            'render': function(node, canvas){
                var pos = node.pos.getc(true);
                canvas.getCtx().drawImage(img_internet_pc_clean, pos.x - 18, pos.y - 18);
            },
            'contains': function(node, pos){
                return ((pos.x >= node.endPos.x && pos.x <= node.endPos.x + 36) &&
                (pos.y >= node.endPos.y && pos.y <= node.endPos.y + 36));
            }
        }
    });
})();
