import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ArrivedMailModel} from '../../models/arrived-mail.model';
import {DepartureMailModel} from '../../models/departure-mail.model';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InitMailService} from '../../services/init-mail.service';
import {LoadingService} from '../../services/loading.service';
import {ReferentialService} from '../../services/referential.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogModel} from '../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';
import {VisualizePdfComponent} from '../visualize-pdf/visualize-pdf.component';

@Component({
  selector: 'app-viewing-departure-mail',
  templateUrl: './viewing-departure-mail.component.html',
  styleUrls: ['./viewing-departure-mail.component.scss']
})
export class ViewingDepartureMailComponent implements OnInit {

    horizontalStepperStep1: FormGroup;
    form: FormGroup;
    mail: DepartureMailModel = new DepartureMailModel();

  constructor(public dialog: MatDialog,
              private _fuseSidebarService: FuseSidebarService,
              private activatedRoute: ActivatedRoute, private  initMailService: InitMailService,
              private _formBuilder: FormBuilder, private router: Router, private loadingService: LoadingService,
              private matDialog: MatDialog, private referentialService: ReferentialService, public translate: TranslateService) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(param => {
          console.log(param);
          this.initMailService.getDepartureMail(param.id).subscribe(

              departureMail => {
                  // console.log(arrivedMail);

                  this.mail = departureMail;
                  console.log(this.mail);
                  this.loadingService.closeSpinner();

              },
              error => {
                  console.log('Error ! : ' + error);
                  const message = 'une erreur technique est survenue lors de la suppression de la direction.  Veuillez réessayer ultérieurement';
                  const dialogData = new DialogModel('title', message);
                  const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                      width: '4000px',
                      data: dialogData
                  });
                  dialogRefError.afterClosed().subscribe(result => {
                  });
              }
          );
      });

  }

    visualizeMailPDF(): void {
        this.matDialog.open(VisualizePdfComponent, {
            width: '90%',
            height: '95%',
            data: {mail: this.mail, type: 'depart'}
            // data: this.mail
        });
    }

}
