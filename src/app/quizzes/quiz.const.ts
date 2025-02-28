import { DatePipe } from "@angular/common";
import { ColumnDef, DataTableButtonObject } from "../app-reusables/data-table/data-table.models";

export const columns: ColumnDef[] = [
    {
        Name: "#", Property: "quizId", IsSort: true
    },
    {
        Name: "Name", Property: "name", IsSort: true
    },
    {
        Name: "Desc", Property: "description", IsSort: true
    },
    {
        Name: "Type", Property: "quizTypeName", IsSort: true
    },
    {
        Name: "Start", Property: "startDate", IsSort: true, Pipe: DatePipe
    },
    {
        Name: "End", Property: "endDate", IsSort: true, Pipe: DatePipe
    },
    {
        Name: "Link", Property: "link", IsSort: true
    },
    {
        Name: "Users", Property: "totalUsers", IsSort: true
    },
    {
        Name: "Winners", Property: "totalWinners", IsSort: true
    },
    {
        Name: "Refusers", Property: "totalRefusers", IsSort: true
    }
];
export const btns: DataTableButtonObject[] = [{
    Text: "Add New",
    MatColor: 'primary',
    Icon: 'add'
}];





///Partiipants

export const participantsColumns: ColumnDef[] = [
    {
        Name: "#", Property: "userQuizId", IsSort: true
    },
    {
        Name: "User#", Property: "userId", IsSort: true
    },
    {
        Name: "Mobile", Property: "mobileNumber", IsSort: true
    },
    {
        Name: "Name", Property: "storeTitle", IsSort: true
    },
    {
        Name: "Quiz Name", Property: "quizName", IsSort: true
    },
    {
        Name: "Questions", Property: "questionCount", IsSort: true
    },
    {
        Name: "Date", Property: "actionDate", IsSort: true, Pipe: DatePipe
    },
    {Name: "Refused", Property: "isRefused", IsSort: true, Highlights: [
        {Operation: '=', Value: true, AltText: 'Yes', Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
        {Operation: '=', Value: false, AltText: 'No', Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
    ]},
    {Name: "Won", Property: "isWon", IsSort: true, Highlights: [
        {Operation: '=', Value: true, AltText: 'Yes', Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
        {Operation: '=', Value: false, AltText: 'No', Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
    ]},
    {Name: "Compensated", Property: "isCompensated", IsSort: true, Highlights: [
        {Operation: '=', Value: true, AltText: 'Yes', Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
        {Operation: '=', Value: false, AltText: 'No', Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
    ]},
    
];

export const menuBtns: DataTableButtonObject[] = [
    {
        Text: 'Compensate',
        Icon: 'payments',
        MatColor: 'primary',
        HideWhen: {
            Property: 'isCompensated',
            Value: true
        }
    }
];