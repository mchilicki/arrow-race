var first = null;

if(first == null || first != false)
  first = true;

function makeStep(map, choosenOption){ 
  if(first){     
    startPoint = arrowStartPoint;
    endpoint = arrowEndPoint;
    lastStep = {x: arrowStartPoint.x - arrowEndPoint.x , y: arrowStartPoint.y - arrowEndPoint.y };
    newStep = step(map, endpoint,choosenOption,lastStep);
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
    if(map[endpoint.y/minimumStep][endpoint.x/minimumStep] == 2)
    {
      $("#winInfoLabel").show();
      $("#winButton").show();
    }
    else if(map[endpoint.y/minimumStep][endpoint.x/minimumStep] == 0)
    {
      newStep = stepOut(endpoint,choosenOption);
      startPoint = endpoint;
      endpoint = newStep;
      lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};  
    }
    else{
      newStep = step(map, endpoint,choosenOption,lastStep);
      if(newStep.x == -1 || newStep.y == -1 || (newStep.x == endpoint.x && newStep.y == endpoint.y)){
        
      }
      else if (newStep.x > (map[0].length-1)*minimumStep)
        newStep.y = map[0].length*minimumStep-1;
      else{ 
      startPoint = endpoint;
      endpoint = newStep;
      lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};    
      }
    }
  }
  return { startPoint: startPoint, endPoint: endpoint };
}

function stepOut(endpoint, value){
  var point = { x:0, y:0 };
  switch(value) {
    case 1:
      point = {x:endpoint.x,y:endpoint.y+minimumStep};
      break;
    case 2:
      point = {x:endpoint.x-minimumStep,y:endpoint.y+minimumStep};
      break;
    case 3:
      point = {x:endpoint.x-minimumStep,y:endpoint.y};
      break;
    case 4:
      point = {x:endpoint.x-minimumStep,y:endpoint.y-minimumStep};
      break;
    case 5:
      point = {x:endpoint.x,y:endpoint.y-minimumStep};
      break;
    case 6:
      point = {x:endpoint.x+minimumStep,y:endpoint.y-minimumStep};
      break;
    case 7:
      point = {x:endpoint.x+minimumStep,y:endpoint.y};
      break;
    case 8:
      point = {x:endpoint.x+minimumStep,y:endpoint.y+minimumStep};
      break;
  }
  return point;  
};
function getPossibleSteps(map, endpoint, lastStep){
  if(map[endpoint.y/minimumStep][endpoint.x/minimumStep] != 0){
    return [
      {x:endpoint.x+lastStep.x,y:endpoint.y-lastStep.y+ minimumStep},
      { x:endpoint.x + lastStep.x - minimumStep, y:endpoint.y - lastStep.y + minimumStep},
      { x:endpoint.x + lastStep.x - minimumStep, y:endpoint.y - lastStep.y},
      { x:endpoint.x + lastStep.x - minimumStep, y:endpoint.y - lastStep.y - minimumStep} ,
      { x:endpoint.x + lastStep.x, y:endpoint.y - lastStep.y - minimumStep} ,
      { x:endpoint.x + lastStep.x + minimumStep, y:endpoint.y - lastStep.y - minimumStep} ,
      { x:endpoint.x + lastStep.x + minimumStep, y:endpoint.y - lastStep.y} ,
      { x:endpoint.x + lastStep.x + minimumStep, y:endpoint.y - lastStep.y + minimumStep} ,
    ]
  } 
  return [
    { x:endpoint.x, y:endpoint.y + minimumStep},
    { x:endpoint.x - minimumStep, y:endpoint.y + minimumStep},
    { x:endpoint.x - minimumStep, y:endpoint.y},
    { x:endpoint.x - minimumStep, y:endpoint.y - minimumStep},
    { x:endpoint.x, y:endpoint.y - minimumStep},
    { x:endpoint.x + minimumStep, y:endpoint.y - minimumStep},
    { x:endpoint.x + minimumStep, y:endpoint.y},
    { x:endpoint.x + minimumStep, y:endpoint.y + minimumStep},
  ]  
}

function step(map, endpoint, value, lastStep){ 
  var point={ x:0, y:0} ;
  if(map[endpoint.y/minimumStep][endpoint.x/minimumStep] != 0){
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
        point = { x:endpoint.x + lastStep.x - minimumStep, y:endpoint.y - lastStep.y + minimumStep} ;
        break;
      case 3:
        point = { x:endpoint.x + lastStep.x - minimumStep, y:endpoint.y - lastStep.y} ;
        break;
      case 4:
        point = { x:endpoint.x + lastStep.x - minimumStep, y:endpoint.y - lastStep.y - minimumStep} ;
        break;
      case 5:
        point = { x:endpoint.x + lastStep.x, y:endpoint.y - lastStep.y - minimumStep} ;
        break;
      case 6:
        point = { x:endpoint.x + lastStep.x + minimumStep, y:endpoint.y - lastStep.y - minimumStep} ;
        break;
      case 7:
        point = { x:endpoint.x + lastStep.x + minimumStep, y:endpoint.y - lastStep.y} ;
        break;
      case 8:
        point = { x:endpoint.x + lastStep.x + minimumStep, y:endpoint.y - lastStep.y + minimumStep} ;
        break;
    } 
  } else {
    switch(value) { 
      case 1:
        if(!first) {
          point = {x:endpoint.x,y:endpoint.y+ minimumStep};
        }
        else
        {
          point ={x:-1,y:-1};
        }
        break;
      case 2:
        point = { x:endpoint.x - minimumStep, y:endpoint.y + minimumStep} ;
        break;
      case 3:
        point = { x:endpoint.x - minimumStep, y:endpoint.y} ;
        break;
      case 4:
        point = { x:endpoint.x - minimumStep, y:endpoint.y - minimumStep} ;
        break;
      case 5:
        point = { x:endpoint.x, y:endpoint.y - minimumStep} ;
        break;
      case 6:
        point = { x:endpoint.x + minimumStep, y:endpoint.y - minimumStep} ;
        break;
      case 7:
        point = { x:endpoint.x + minimumStep, y:endpoint.y} ;
        break;
      case 8:
        point = { x:endpoint.x + minimumStep, y:endpoint.y + minimumStep} ;
        break;
    } 
  }  
  return point;  
} ;

  