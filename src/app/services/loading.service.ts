import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SpinnerModalComponent} from '../pages/spinner-modal/spinner-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private matDialog: MatDialog) { }

  displaySpinner(): MatDialogRef<SpinnerModalComponent, any>{
      return this.matDialog.open(SpinnerModalComponent, { disableClose: true});
  }
}
