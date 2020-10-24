import {ArrivedMailModel} from './arrived-mail.model';
import {DepartureMailModel} from './departure-mail.model';

export class ArchiveModel {

    type: string;
    idEntry: string;
    idDirectory: string;
    subject: string;
    senderOrReceiver: string;
    dateCreation: string;
    dateCloture: string;
    attachments: string;
    observations: string;
    idScanFile: string;
    steps: any[];
    ampliations: string;

    public mapToArrivedMail(): ArrivedMailModel{
        const arrivedMail = new ArrivedMailModel();
        arrivedMail.idEntry = this.idEntry;
        arrivedMail.idDirectory = this.idDirectory;
        arrivedMail.receptionDate = this.dateCreation;
        arrivedMail.subject = this.subject;
        arrivedMail.sender = this.senderOrReceiver;
        arrivedMail.idScanFile = this.idScanFile;
        arrivedMail.steps = this.steps;

        return arrivedMail;

    }

    public mapToDepartureMail(): DepartureMailModel{
        const departureMail = new DepartureMailModel();
        departureMail.idEntry = this.idEntry;
        departureMail.idDirectory = this.idDirectory;
        departureMail.departureDate = this.dateCreation;
        departureMail.subject = this.subject;
        departureMail.ampliations = this.ampliations;
        departureMail.receiver = this.senderOrReceiver;
        departureMail.idScanFile = this.idScanFile;


        return departureMail;

    }


}
