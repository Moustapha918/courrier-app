import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ReferentialService} from "../../services/referential.service";
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {NewServiceEntityComponent} from '../new-service-entity/new-service-entity.component';




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

    code: string;
    codeDirection: string;
    Direction1: string;
    Adresse1: string;

    constructor(public dialog: MatDialog, private referentialService: ReferentialService) {


    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewServiceEntityComponent, {
            width: '4000px',
            data: {code: this.code, codeDirection: this.codeDirection , Direction1: this.Direction1, adresse1: this.Adresse1}
        });



    }


    // tslint:disable-next-line:typedef
    ngOnInit() {

        console.log(this.referentialService.getAllServicesEntity());
        this.dataSource = this.referentialService.getAllServiceEntityFromBackend();
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
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

}
