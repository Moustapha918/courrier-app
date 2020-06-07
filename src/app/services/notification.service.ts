import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';



@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    constructor(private _snackBar: MatSnackBar) { }



    // tslint:disable-next-line:typedef
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
        });
    }

    // tslint:disable-next-line:typedef
    openSnackBar1(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
        });
    }
}
