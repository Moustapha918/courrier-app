import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dilaog',
  templateUrl: './error-dilaog.component.html',
  styleUrls: ['./error-dilaog.component.scss']
})
export class ErrorDilaogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorDilaogComponent>) {
      dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

    onConfirm(): void {

        // Close the dialog, return true
        this.dialogRef.close(true);
    }

}
