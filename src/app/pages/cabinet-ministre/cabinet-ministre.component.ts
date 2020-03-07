import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {NotificationService} from '../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {MinisterOfficeModel} from '../../models/minister-office.model';
import {NewCabinetMinstreComponent} from '../new-cabinet-minstre/new-cabinet-minstre.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cabinet-ministre',
  templateUrl: './cabinet-ministre.component.html',
  styleUrls: ['./cabinet-ministre.component.scss']
})
export class CabinetMinistreComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: MatTableDataSource;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, public dialog1: MatDialog,
              private referentialService: ReferentialService,
              private notifyService: NotificationService,
              private translate: TranslateService) { }

    // tslint:disable-next-line:typedef
  ngOnInit() {
      this.updateMinisterOfficeTable();
  }

    private updateMinisterOfficeTable(): void {
        this.referentialService.getAllMinistreOfficeFromBackend().subscribe((data) => {

            this.dataSource = new MatTableDataSource<MinisterOfficeModel>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    addMinisterOffice(): void {
        const dialogRef = this.dialog.open(NewCabinetMinstreComponent, {
            width: '4000px',

        });

        dialogRef.afterClosed().subscribe(result => {
            this.updateMinisterOfficeTable();

            if (result === true) {
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.ADDMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });
    }

    deleteMinisterOffice(minsterOffice): void {
        this.referentialService.deleteMinisterOffice(minsterOffice.code)
            .subscribe(
                () => {
                    console.log('successful minsteroffice delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

    deleteConfirm(minsterOffice): void {
        const message = this.translate.instant('REFERENTIAL.DELETEMSGCONFIRMATIONMINISTEROFFICE');
        const dialogData = new ConfirmDialogModel(this.translate.instant('REFERENTIAL.DELETECONFIRMATION'), message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                this.deleteMinisterOffice(minsterOffice);
                this.updateMinisterOfficeTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.DELETEMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });
    }

    updateMinisterOffice(minsterOffice): void {

        const dialogRef = this.dialog.open(NewCabinetMinstreComponent, {
            width: '4000px',
            data: minsterOffice,
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                // this.dataSource = this.referentialService.getAllDirectionsFromBackend();
                this.updateMinisterOfficeTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.UPDATEMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

}