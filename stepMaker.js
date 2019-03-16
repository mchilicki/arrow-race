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

function makeStep(choosenOption){
  if(first){    
    startPoint = arrowStartPoint;
    endpoint = arrowEndPoint;
    lastStep = {x: arrowStartPoint.x - arrowEndPoint.x , y: arrowStartPoint.y - arrowEndPoint.y };
    newStep = step(endpoint,choosenOption,lastStep);
    if(newStep.x == -1 || newStep.y == -1){
      
    }
    else{
    first = false;  
    startPoint = endpoint;
    endpoint = newStep;
    lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};   
    }  
  }
  else{
    newStep = step(endpoint,choosenOption,lastStep);
    if(newStep.x == -1 || newStep.y == -1){
      
    }
    else{
    startPoint = endpoint;
    endpoint = newStep;
    lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};    
    }
  }
  return { startPoint: startPoint, endPoint: endpoint };
}

function step(endpoint,value,lastStep){
  var point={x:0,y:0};
  switch(value) {
    case 1:
      if(!first) {
        point = {x:endpoint.x+lastStep.x,y:endpoint.y-lastStep.y+ minimumStep};
      }
      else
      {
        point ={x:-1,y:-1};
      }
      break;
    case 2:
      point = {x:endpoint.x+lastStep.x- minimumStep,y:endpoint.y-lastStep.y+ minimumStep};
      break;
    case 3:
      point = {x:endpoint.x+lastStep.x- minimumStep,y:endpoint.y-lastStep.y};
      break;
    case 4:
      point = {x:endpoint.x+lastStep.x- minimumStep,y:endpoint.y-lastStep.y- minimumStep};
      break;
    case 5:
      point = {x:endpoint.x+lastStep.x,y:endpoint.y-lastStep.y- minimumStep};
      break;
    case 6:
      point = {x:endpoint.x+lastStep.x+ minimumStep,y:endpoint.y-lastStep.y-minimumStep};
      break;
    case 7:
      point = {x:endpoint.x+lastStep.x+ minimumStep,y:endpoint.y-lastStep.y};
      break;
    case 8:
      point = {x:endpoint.x+lastStep.x+ minimumStep,y:endpoint.y-lastStep.y+ minimumStep};
      break;
  }
  return point;  
};

  