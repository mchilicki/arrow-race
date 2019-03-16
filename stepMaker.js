// # Quintus moving ball example
//
// [Run the example](../quintus/examples/ball/index.html)
//
// This is one of the simplest possible examples of using 
// Quintus that doesn't use the scene/stage functionality, 
// but rather just creates a single sprite and steps and 
// draws that sprite
//
// The goal of the example is to demonstrate the modularity
// of the engine and the ability to only include the components
// you actually need.
var first = null;

if(first == null || first != false)
first = true;

function makestep(value){
  debugger;
  if(first){    
    startPoint = {x:12,y:512};
    endpoint = {x:12,y:511};
    lastStep = {x:0,y:1};
    newStep = step(endpoint,value,lastStep);
    first = false;  
    startPoint = endpoint;
    endpoint = newStep;
    lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};     
  }
  else{
    newStep = step(endpoint,value,lastStep);
    startPoint = endpoint;
    endpoint = newStep;
    lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};    
    document.writeln("x: " + newStep.x);
    document.writeln("y: " + newStep.y);
  }

  function step(endpoint,value,lastStep){
    var point={x:0,y:0};
    switch(value)
        {
          case 1:
          if(!first){
          point = {x:endpoint.x+lastStep.x,y:endpoint.y-lastStep.y+1};
          }
          break;
          case 2:
          point = {x:endpoint.x+lastStep.x-1,y:endpoint.y-lastStep.y+1};
          break;
          case 3:
          point = {x:endpoint.x+lastStep.x-1,y:endpoint.y-lastStep.y};
          break;
          case 4:
          point = {x:endpoint.x+lastStep.x-1,y:endpoint.y-lastStep.y-1};
          break;
          case 5:
          point = {x:endpoint.x+lastStep.x,y:endpoint.y-lastStep.y-1};
          break;
          case 6:
          point = {x:endpoint.x+lastStep.x+1,y:endpoint.y-lastStep.y-1};
          break;
          case 7:
          point = {x:endpoint.x+lastStep.x+1,y:endpoint.y-lastStep.y};
          break;
          case 8:
          point = {x:endpoint.x+lastStep.x+1,y:endpoint.y-lastStep.y+1};
          break;
        }
        return point;
  }
};

  