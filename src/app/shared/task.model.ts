export class Task{
    constructor(
        public taskName: string,
        public taskDescription: string,
        public taskList: string,
        public taskDueDate: Date,
    ) {}
}