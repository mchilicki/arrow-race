var first = null;

if (first == null || first != false)
	first = true;

function makeNextStep(map, chosenOption, settings) {
	const minimumStep = settings.minimumStep;
	if (first) {
		startPoint = map.arrowStartPoint;
		endPoint = map.arrowEndPoint;
		lastStep = countStep(map.arrowStartPoint, map.arrowEndPoint);
		newStep = countNextStep(map, endPoint, chosenOption, lastStep, settings);
		if (newStep === null) {
			return null;
		} 
		else {
			first = false;
			startPoint = endPoint;
			endPoint = newStep;
			lastStep = countStep(startPoint, endPoint);
		}
	}
	else {
		if (map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] == 2) {
			$("#winInfoLabel").show();
			$("#winButton").show();
		}
		else if (map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] == 0) {
			newStep = countStepOut(endPoint, chosenOption, settings);
			startPoint = endPoint;
			endPoint = newStep;
			lastStep = countStep(startPoint, endPoint);
		} 
		else {
			newStep = countNextStep(map, endPoint, chosenOption, lastStep, settings);
			if (newStep === null || (newStep.x == endPoint.x && newStep.y == endPoint.y)) {

			}
			else if (newStep.x > (map.level[0].length - 1) * minimumStep) {
				newStep.y = map.level[0].length * minimumStep - 1;
			}
			else {
				startPoint = endPoint;
				endPoint = newStep;
				lastStep = countStep(startPoint, endPoint);
			}
		}
	}
	return { startPoint: startPoint, endPoint: endPoint };
}

function countStepOut(endPoint, chosenOption, settings) {
	const minimumStep = settings.minimumStep;
	var nextStep = null;
	switch (chosenOption) {
		case 1:
			nextStep = { x: endPoint.x, y: endPoint.y + minimumStep };
			break;
		case 2:
			nextStep = { x: endPoint.x - minimumStep, y: endPoint.y + minimumStep };
			break;
		case 3:
			nextStep = { x: endPoint.x - minimumStep, y: endPoint.y };
			break;
		case 4:
			nextStep = { x: endPoint.x - minimumStep, y: endPoint.y - minimumStep };
			break;
		case 5:
			nextStep = { x: endPoint.x, y: endPoint.y - minimumStep };
			break;
		case 6:
			nextStep = { x: endPoint.x + minimumStep, y: endPoint.y - minimumStep };
			break;
		case 7:
			nextStep = { x: endPoint.x + minimumStep, y: endPoint.y };
			break;
		case 8:
			nextStep = { x: endPoint.x + minimumStep, y: endPoint.y + minimumStep };
			break;
	}
	return nextStep;
};

function getPossibleSteps(map, endPoint, lastStep, settings) {
	const minimumStep = settings.minimumStep;
	if (map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] != 0) {
		return [
			{ x: endPoint.x + lastStep.x, y: endPoint.y - lastStep.y + minimumStep },
			{ x: endPoint.x + lastStep.x - minimumStep, y: endPoint.y - lastStep.y + minimumStep },
			{ x: endPoint.x + lastStep.x - minimumStep, y: endPoint.y - lastStep.y },
			{ x: endPoint.x + lastStep.x - minimumStep, y: endPoint.y - lastStep.y - minimumStep },
			{ x: endPoint.x + lastStep.x, y: endPoint.y - lastStep.y - minimumStep },
			{ x: endPoint.x + lastStep.x + minimumStep, y: endPoint.y - lastStep.y - minimumStep },
			{ x: endPoint.x + lastStep.x + minimumStep, y: endPoint.y - lastStep.y },
			{ x: endPoint.x + lastStep.x + minimumStep, y: endPoint.y - lastStep.y + minimumStep },
		]
	}
	return [
		{ x: endPoint.x, y: endPoint.y + minimumStep },
		{ x: endPoint.x - minimumStep, y: endPoint.y + minimumStep },
		{ x: endPoint.x - minimumStep, y: endPoint.y },
		{ x: endPoint.x - minimumStep, y: endPoint.y - minimumStep },
		{ x: endPoint.x, y: endPoint.y - minimumStep },
		{ x: endPoint.x + minimumStep, y: endPoint.y - minimumStep },
		{ x: endPoint.x + minimumStep, y: endPoint.y },
		{ x: endPoint.x + minimumStep, y: endPoint.y + minimumStep },
	]
}

function countNextStep(map, endPoint, chosenOption, lastStep, settings) {
	const minimumStep = settings.minimumStep;
	var nextStep = null;
	if (map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] != 0) {
		switch (chosenOption) {
			case 1:
				if (!first) {
					nextStep = { x: endPoint.x + lastStep.x, y: endPoint.y - lastStep.y + minimumStep };
				}
				else {
					nextStep = null;
				}
				break;
			case 2:
				nextStep = { x: endPoint.x + lastStep.x - minimumStep, y: endPoint.y - lastStep.y + minimumStep };
				break;
			case 3:
				nextStep = { x: endPoint.x + lastStep.x - minimumStep, y: endPoint.y - lastStep.y };
				break;
			case 4:
				nextStep = { x: endPoint.x + lastStep.x - minimumStep, y: endPoint.y - lastStep.y - minimumStep };
				break;
			case 5:
				nextStep = { x: endPoint.x + lastStep.x, y: endPoint.y - lastStep.y - minimumStep };
				break;
			case 6:
				nextStep = { x: endPoint.x + lastStep.x + minimumStep, y: endPoint.y - lastStep.y - minimumStep };
				break;
			case 7:
				nextStep = { x: endPoint.x + lastStep.x + minimumStep, y: endPoint.y - lastStep.y };
				break;
			case 8:
				nextStep = { x: endPoint.x + lastStep.x + minimumStep, y: endPoint.y - lastStep.y + minimumStep };
				break;
		}
	} else {
		switch (chosenOption) {
			case 1:
				if (!first) {
					nextStep = { x: endPoint.x, y: endPoint.y + minimumStep };
				}
				else {
					nextStep = null;
				}
				break;
			case 2:
				nextStep = { x: endPoint.x - minimumStep, y: endPoint.y + minimumStep };
				break;
			case 3:
				nextStep = { x: endPoint.x - minimumStep, y: endPoint.y };
				break;
			case 4:
				nextStep = { x: endPoint.x - minimumStep, y: endPoint.y - minimumStep };
				break;
			case 5:
				nextStep = { x: endPoint.x, y: endPoint.y - minimumStep };
				break;
			case 6:
				nextStep = { x: endPoint.x + minimumStep, y: endPoint.y - minimumStep };
				break;
			case 7:
				nextStep = { x: endPoint.x + minimumStep, y: endPoint.y };
				break;
			case 8:
				nextStep = { x: endPoint.x + minimumStep, y: endPoint.y + minimumStep };
				break;
		}
	}
	return nextStep;
};

function countStep(startPoint, endPoint) {
	return { x: endPoint.x - startPoint.x, y: startPoint.y - endPoint.y };
}

function getBottomOption() {

}

function getTopLeftOption() {

}