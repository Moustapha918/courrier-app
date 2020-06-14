import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {NewServiceEntityComponent} from '../new-service-entity/new-service-entity.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {ServiceEntityModel} from '../../models/service-entity.model';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../../services/notification.service';
import {DirectionModel} from '../../models/direction.model';
import {SpinnerModalComponent} from '../spinner-modal/spinner-modal.component';
import {LoadingService} from '../../services/loading.service';




@Component({
  selector: 'app-service-entity',
  templateUrl: './service-entity.component.html',
  styleUrls: ['./service-entity.component.scss']
})
export class ServiceEntityComponent implements OnInit {

    displayedColumns: string[] = ['code', 'codeDirection', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: any; // Promise<any> | null;
    direction: DirectionModel;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(public dialog: MatDialog, private referentialService: ReferentialService,
                private notifyService: NotificationService, private loadingService: LoadingService, public translate: TranslateService) {


    }

    addServiceEntity(): void {

        const dialogRef = this.dialog.open(NewServiceEntityComponent, {
            width: '4000px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.updateServicesTable();
            if (result === true) {
                this.loadingService.closeSpinner();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.ADDSERVICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }

        });

    }


    // tslint:disable-next-line:typedef
    ngOnInit() {

        this.updateServicesTable();
    }

    private updateServicesTable(): void {
        this.referentialService.getAllServiceEntityFromBackend().subscribe((services) => {

            services.map(service  => {
                this.referentialService.getDirectionByCode(service.codeDirection).subscribe((direction) => {
                    service.labelDirection = [direction.labelAR, direction.labelFR];
                });
                return service;
            } );
            this.dataSource = new MatTableDataSource<ServiceEntityModel>(services);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }


    deleteServiceEntity(service): void {
        this.referentialService.deleteServiceEntity(service.code)
            .subscribe(
                () => {
                    console.log('successful service delete');
                    this.updateServicesTable();
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );



    }

    deleteConfirm(serviceEntity): void {
        const message = this.translate.instant('REFERENTIAL.DELETEMSGCONFIRMATIONSERVICE');
        const dialogData = new ConfirmDialogModel(this.translate.instant('REFERENTIAL.DELETECONFIRMATION'), message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.loadingService.closeSpinner();
                this.deleteServiceEntity(serviceEntity);
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.DELETESERVICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

    updateServiceEntity(service): void {

        const dialogRef = this.dialog.open(NewServiceEntityComponent, {
            width: '4000px',
            data: service
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loadingService.closeSpinner();
                this.updateServicesTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.UPDATESERVICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

}
