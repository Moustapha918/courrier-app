import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ReferentialService} from "../../services/referential.service";
import {NewDirectionComponent} from "../new-direction/new-direction.component";
import {NewDepartementComponent} from "../new-departement/new-departement.component";



@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: any; // Promise<any> | null;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    /*Id: number;
    Direction1: string;
    Adresse1: string;*/

    constructor(public dialog: MatDialog,
                private referentialService: ReferentialService) {


    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewDepartementComponent, {
            width: '4000px',
            // data: {Id: this.Id, Direction1: this.Direction1, adresse1: this.Adresse1}
        });
        // dialogRef.afterClosed().subscribe();
    }


    // tslint:disable-next-line:typedef
    ngOnInit() {


        this.dataSource = this.referentialService.getAllDepartmentFromBackend();

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    deleteDepartement(departement): void {
        this.referentialService.deleteDepartement(departement.code)
            .subscribe(
                () => {
                    console.log('successful department delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }



}
