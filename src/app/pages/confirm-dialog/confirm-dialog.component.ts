import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DirectionModel} from '../../models/direction.model';
import {LoadingService} from '../../services/loading.service';



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
               @Inject(MAT_DIALOG_DATA) public data: DialogModel,
               private loadingService: LoadingService) {
      this.title = data.title;
      this.message = data.message;
  }

    // tslint:disable-next-line:typedef
  ngOnInit() {

  }
    onConfirm(): void {

        // Close the dialog, return true
        this.dialogRef.close(true);
        this.loadingService.displaySpinner();

    }

    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }


}

export class DialogModel {

    constructor(public title: string, public message: string) {
    }
}
