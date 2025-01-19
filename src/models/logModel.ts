export class Logs {
    id: string;
    date: string;
    time: string;
    details: string;
    user: string;
    status: string;

    constructor(id: string, date: string, time: string, details: string, user: string, status: string) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.details = details;
        this.user = user;
        this.status = status;
    }
}