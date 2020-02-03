import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {ReferentialService} from "../../services/referential.service";
import {InitMailService} from "../../services/init-mail.service";
import {Observable} from "rxjs";
import {DirectionModel} from "../../models/direction.model";
import {FilesDataSource} from "../arrived-mail-sc/arrived-mail-sc.component";
// @ts-ignore


export interface Direction {
    code: string;
    label: string;
    address: string;

}

const ELEMENT_DATA: Direction[] = [
    {code: '1', label: 'Hydrogen', address: 'hhhhh'},
    {code: '2', label: 'Helium', address: 'hhhh'},
    /*{ID: 3, Direction_name: 'Lithium', Adresse: 'jyghg'},
    {ID: 4, Direction_name: 'Beryllium', Adresse: 'hhhjk'},
    {ID: 5, Direction_name: 'Boron', Adresse: 'jyuygh'},
    {ID: 6, Direction_name: 'Carbon', Adresse: 'iuiij'},
    {ID: 7, Direction_name: 'Nitrogen', Adresse: 'kjkjk'},
    {ID: 8, Direction_name: 'Oxygen', Adresse: 'ujklj'},
    {ID: 9, Direction_name: 'Fluorine', Adresse: 'ujhg'},
    {ID: 10, Direction_name: 'Neon', Adresse: 'uyhtg'},*/
];

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {



    displayedColumns: string[] = ['code', 'label', 'address'];
    // @ts-ignore
    dataSource: any; // Promise<any> | null;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    Id: number;
    Direction1: string;
    Adresse1: string;

    constructor(public dialog: MatDialog,
                private referentialService: ReferentialService) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewDirectionComponent, {
            width: '4000px',
            data: {Id: this.Id, Direction1: this.Direction1, adresse1: this.Adresse1}
        });

    }


    // tslint:disable-next-line:typedef
    ngOnInit() {


        this.dataSource = this.referentialService.getAllDirectionsFromBackend();
        console.log(this.referentialService.getAllDirectionsFromBackend());
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
    }



}


