import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SpinnerModalComponent} from '../pages/spinner-modal/spinner-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    refDialog: MatDialogRef<SpinnerModalComponent, any>;

  constructor(private matDialog: MatDialog) {
  }

  displaySpinner(): MatDialogRef<SpinnerModalComponent, any>{

      this.refDialog = this.matDialog.open(SpinnerModalComponent, { disableClose: true});
      return this.refDialog;
  }


  closeSpinner(): void{
      if (this.refDialog){
          this.refDialog.close();
      }
  }
}
