
export class ArrivedMailModelModel{
    idEntry: string;
    idDirectory: string;
    subject: string;
    sender: string;
    receptionDate: string;
    idReceivedDocument: string;
    dateReceivedDocument: string;
    priorityDegree: string;
    attachments: string;
    observations: string;

    constructor(idEntry, idDirectory, subject, sender, receptionDate, idReceivedDocument, dateReceivedDocument, priorityDegree, attachments, observations){
        this.idEntry = idEntry;
        this.idDirectory = idDirectory;
        this.subject = subject;
        this.sender = sender;
        this.receptionDate = receptionDate;
        this.idReceivedDocument = idReceivedDocument;
        this.dateReceivedDocument = dateReceivedDocument;
        this.priorityDegree = priorityDegree;
        this.attachments = attachments;
        this.observations = observations;

    }
}


