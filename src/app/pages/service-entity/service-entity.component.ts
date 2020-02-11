import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {NewServiceEntityComponent} from '../new-service-entity/new-service-entity.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';





@Component({
  selector: 'app-service-entity',
  templateUrl: './service-entity.component.html',
  styleUrls: ['./service-entity.component.scss']
})
export class ServiceEntityComponent implements OnInit {

    displayedColumns: string[] = ['code', 'codeDirection', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: any; // Promise<any> | null;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(public dialog: MatDialog, private referentialService: ReferentialService) {


    }

    addServiceEntity(): void {
        const dialogRef = this.dialog.open(NewServiceEntityComponent, {
            width: '4000px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.dataSource = this.referentialService.getAllServiceEntityFromBackend();
            // tslint:disable-next-line:triple-equals

        });

    }


    // tslint:disable-next-line:typedef
    ngOnInit() {

        console.log(this.referentialService.getAllServicesEntity());
        this.dataSource = this.referentialService.getAllServiceEntityFromBackend();
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
    }

    confirmDialog(serviceEntity): void {
        const message = `Vous êtes sûr de vouloir supprimer ce service`;

        const dialogData = new ConfirmDialogModel('Confirmation de suppression', message);


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.deleteServiceEntity(serviceEntity);
                this.dataSource = this.referentialService.getAllServiceEntityFromBackend();
            }
        });

    }

    deleteServiceEntity(service): void {
        this.referentialService.deleteServiceEntity(service.code)
            .subscribe(
                () => {
                    console.log('successful service delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );

    }

    updateServiceEntity(service): void {

        const dialogRef = this.dialog.open(NewServiceEntityComponent, {
            maxWidth: '4000px',
            data: service
        });
        dialogRef.afterClosed().subscribe(result => {
            this.dataSource = this.referentialService.getAllServiceEntityFromBackend();
        });

    }

}
