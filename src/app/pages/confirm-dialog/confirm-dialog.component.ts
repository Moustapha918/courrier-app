import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DirectionModel} from '../../models/direction.model';



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    title: string;
    message: string;
    direction: DirectionModel;

  constructor( public dialogRef: MatDialogRef<ConfirmDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
      this.title = data.title;
      this.message = data.message;

  }

    // tslint:disable-next-line:typedef
  ngOnInit() {

  }

    onConfirm(): void {

        // Close the dialog, return true
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }



}

export class ConfirmDialogModel {

    constructor(public title: string, public message: string) {
    }
}
