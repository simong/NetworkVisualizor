$(document).ready(function(){

    module("Config");
    
    test("Aantal", function(){
        var config = new Config();
        config.setData([]);
        
        var m = createRandomComputer(config);
        config.addComputer(m);
        config.addComputer(m);
        equal(2, config.getRunningComputers());
    });
    
    module("Beheer systeem");
    test("Foo", function() {});
    
    module("Computer");
    test("Getters & Setters", function() {
        var naam = "Ubuntu 11.84";
        var c = new Computer("ubuntu1", naam, "clean", false, [], []);
        equal(naam, c.getNaam());
        equal(false, c.isInternet());
    });
    
    module("Virus");
    test("Getters & Setters", function() {
        var virus = new SlechtBestand("id", "I<3u", 30, 20, "images/icons/virus/rood.png");
        equal("I<3u", virus.getNaam());
        equal(30, virus.getVerspreidingSnelheid());
        equal(20, virus.getInfectieFactor());        
    });
    
});


function createRandomComputer(config){
    var r = Math.floor(Math.random() * 100);
    
    var m = new Computer("randomid", "random" + r, "clean", false, [], [] );
    return m;
}
