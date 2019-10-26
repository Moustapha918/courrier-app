export class AutoGenParamsModel {
    idDirectory: string;
    idEntry: string;
    receptionDate: string;

    constructor(idEntry, idDirectory, receptionDate){
        this.idEntry = idEntry;
        this.idDirectory = idDirectory;
        this.receptionDate = receptionDate;
    }
}