export class AutoGenParamsModel {
    idDirectory: string;
    idEntry: string;
    receptionDate: string;
    listDirectories: any[];

    constructor(idEntry, idDirectory, receptionDate, listDirectories){
        this.idEntry = idEntry;
        this.idDirectory = idDirectory;
        this.receptionDate = receptionDate;
        this.listDirectories = listDirectories;
    }
}