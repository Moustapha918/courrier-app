import {ApplicationUserModel} from './applicationUser';
import {DirectionModel} from './direction.model';

export class StepsModel{
    annotations: any[];
    ventilationType: string;
    user: ApplicationUserModel;
    ventilations: any[];
    specificInstructions: string;
    dateHandling: any;
    ventilationDirections: DirectionModel[];


}
