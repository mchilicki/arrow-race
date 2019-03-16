

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
    if(mapa[endpoint.x/minimumStep][endpoint.y/minimumStep] == 2)
    {
      var button = document.createElement("input");
      button.type = "button";
      button.value = "Zagraj jeszcze raz";
      button.onclick = window.location.reload();
      context.appendChild(button);
    }
    else if(mapa[endpoint.y/minimumStep][endpoint.x/minimumStep] == 0)
    {
      newStep = stepOut(endpoint,choosenOption);
      startPoint = endpoint;
      endpoint = newStep;
      lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};  
    }
    else{
      newStep = step(endpoint,choosenOption,lastStep);
      if(newStep.x == -1 || newStep.y == -1 || (newStep.x == endpoint.x && newStep.y == endpoint.y)){
        
      }
      else if (newStep.x > (mapa[0].length-1)*minimumStep)
        newStep.y = mapa[0].length*minimumStep-1;
      else{ 
      startPoint = endpoint;
      endpoint = newStep;
      lastStep = {x:endpoint.x-startPoint.x, y:startPoint.y-endpoint.y};    
      }
    }
  }
  return { startPoint: startPoint, endPoint: endpoint };
}

function stepOut(endpoint,value){
  var point={x:0,y:0};
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
function getPossibleSteps(endpoint, lastStep){
  if(mapa[endpoint.y/minimumStep][endpoint.x/minimumStep] != 0){
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

function step(endpoint, value, lastStep){ 
  var point={ x:0, y:0} ;
  if(mapa[endpoint.y/minimumStep][endpoint.x/minimumStep] != 0){
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

  