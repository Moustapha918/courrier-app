import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ReferentialService} from "../../services/referential.service";
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {NewServiceEntityComponent} from '../new-service-entity/new-service-entity.component';


export interface Direction {
    code: string;
    codeDirection: string;
    label: string;
    address: string;

}

const ELEMENT_DATA: Direction[] = [
    {code: '1', codeDirection: 'hyh', label: 'Hydrogen', address: 'hhhhh'},
    {code: '2', codeDirection: 'iui', label: 'Helium', address: 'hhhh'},
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
  selector: 'app-service-entity',
  templateUrl: './service-entity.component.html',
  styleUrls: ['./service-entity.component.scss']
})
export class ServiceEntityComponent implements OnInit {

    displayedColumns: string[] = ['code', 'codeDirection', 'label', 'address'];
    // @ts-ignore
    dataSource: any; // Promise<any> | null;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    Id: number;
    codeDirection: string;
    Direction1: string;
    Adresse1: string;

    constructor(public dialog: MatDialog, private referentialService: ReferentialService) {


    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewServiceEntityComponent, {
            width: '4000px',
            data: {Id: this.Id, codeDirection: this.codeDirection , Direction1: this.Direction1, adresse1: this.Adresse1}
        });



    }


    // tslint:disable-next-line:typedef
    ngOnInit() {

        console.log(this.referentialService.getAllServicesEntity());
        this.dataSource = this.referentialService.getAllServiceEntityFromBackend();
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
    }

}
