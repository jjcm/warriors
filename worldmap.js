function mapNode(name, artwork, icon, connections, storyBattle, x, y){
    this.name = name;
    this.artwork = artwork;
    this.icon = icon;
    this.connections = connections;
    this.storyBattle = storyBattle;
    this.x = x;
    this.y = y;
  
    this.visited = false;
    this.revealed = false;
  }
  var map = {
    currentLocation : "foo", 
  
    highlightNodes : function(){
      map.clearNodeHighlights();
      currentNode = document.getElementById(map.currentLocation);
      currentNode.classList.add("currentLocation");
    },
  
    clearNodeHighlights : function(){
      places = document.getElementById("places").children;
      for(i = 0; i < places.length; i++){
        places[i].className = "place";
      }
      //need to add highlighting code for the nodes
    },
  
    generateNodes : function(){
      places = document.getElementById("places");
      for(node in map.nodes){
        nodeDom = document.createElement('div');
        nodeDom.className = "place";
        nodeDom.id = node;
        places.appendChild(nodeDom);
      }
  
      map.highlightNodes();
    },
  
    nodes : {
      foo : {"name" : "foo", "connectionNames" : ["bar", "foobar"]},
      bar : {"name" : "bar", "connectionNames" : ["foo", "foobar"]},
      foobar : {"name" : "foobar", "connectionNames" : ["foo", "bar"]}
    }
  }