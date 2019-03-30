import { ChosenOption } from './chosen-option.enum';

export interface Settings {
    canvasWidth: number,
    canvasHeight: number,
    minimumStep: number,
    possibleMoveDotSize: number,
    possibleMoveDotColor: string,
    offroadDotSize: number,
    offroadDotColor: string,
    offRoadTileNumber: ChosenOption,
    roadTileNumber: ChosenOption,
    finishLineTileNumber: ChosenOption,
}
