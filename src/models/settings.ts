import { ChosenOption } from './chosen-option.enum';
import { TileType } from './tile-type.enum';

export interface Settings {
    canvasWidth: number,
    canvasHeight: number,
    minimumStep: number,
    possibleMoveDotSize: number,
    roadMoveDotColor: string,
    offRoadMoveDotColor: string,
    finishLineMoveDotColor: string,
    offroadDotSize: number,
    offroadDotColor: string,
    offRoadTileNumber: TileType,
    roadTileNumber: TileType,
    finishLineTileNumber: TileType,
}
