import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogModel} from "../confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'app-error-dilaog',
  templateUrl: './error-dilaog.component.html',
  styleUrls: ['./error-dilaog.component.scss']
})
export class ErrorDilaogComponent implements OnInit {

  message: string;
  title: string;
    constructor(public dialogRef: MatDialogRef<ErrorDilaogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogModel) {
      dialogRef.disableClose = true;
      this.message = data.message;
      this.title = data.title;
  }

  ngOnInit(): void {
  }

    onConfirm(): void {

        // Close the dialog, return true
        this.dialogRef.close(true);
        console.log(this.message);
    }

}
