
$(document).ready(function(){

    module("Config");
    
    test("Aantal", function(){
        var config = new Config();
        config.setData([]);
        
        var m = createRandomMachine(config);
        config.addMachine(m);
        config.addMachine(m);
        equals(2, config.getRunningMachines());
    });
    
    
});


function createRandomMachine(config){
    var r = Math.floor(Math.random() * 100);
    
    var m = new Machine();
    m.setName("random" + r);
    m.setId(m.name + config.getRunningMachines() + 1);
    m.setType("circle");
    m.setAdjacencies([]);
    return m;
}
