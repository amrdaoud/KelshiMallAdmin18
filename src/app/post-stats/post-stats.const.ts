import { of } from "rxjs";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { PostStatsFilterModel } from "./post-stats";

export const postStatsConst :
{columns: ColumnDef[], initialFilter?: PostStatsFilterModel, filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[]} = {
    columns: [
        {Name: "#", Property: "postStatsId", IsSort: true},
        {Name: "Date", Property: "date", Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a', IsSort: true},
        {Name: "Type", Property: "statTypeName", IsSort: true},
        {Name: "Issuer", Property: "storeTitle", IsSort: true},
        {Name: "Issuer #", Property: "mobileNumber"},
        {Name: "Description", Property: "description", IsSort: true},
    ],
    filters : [
        {
            Type: 'twoDates',
            ControlName: 'DateFrom',
            ControlName2: 'DateTo',
            PlaceHolder: 'Posted After',
            PlaceHolder2: 'Posted Before',
            UpdateOn: 'blur'
        },
        {
            Type: 'select',
            ControlName: 'Status',
            PlaceHolder: 'Status',
            UpdateOn: 'blur',
            Data: of([{Name: 'Active'},{Name: 'Pending'},{Name: 'Inactive'},{Name: 'Refused'},{Name: 'Deleted'}, {Name: 'Outdated'}]),
            DisplayProperty: 'Name',
            ValueProperty: 'Name'
        },
        {
            Type: 'select',
            ControlName: 'IsFeatured',
            PlaceHolder: 'Featured?',
            UpdateOn: 'blur',
            Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
            DisplayProperty: 'Name',
            ValueProperty: 'Value'
        },
        {
            Type: 'select',
            ControlName: 'IsReposted',
            PlaceHolder: 'Reposted?',
            UpdateOn: 'blur',
            Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
            DisplayProperty: 'Name',
            ValueProperty: 'Value'
        },
    ]
}


export const postReportListColumns: ColumnDef[] = [
    {Name: '#', Property: 'postId', IsSort: true},
    {Name: 'Post', Property: 'postTitle', IsSort: true},
    {Name: 'User', Property: 'userName', IsSort: true},
    {Name: 'Store', Property: 'storeTitle', IsSort: true},
    {Name: 'Mobile', Property: 'mobileNumber', IsSort: true},
    {Name: "Status", Property: "postStatus", Tooltip: "statusReason", IsSort: true, Highlights: [
     {Operation: '=', Value: "Active", Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
     {Operation: '=', Value: "Deleted", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'},
     {Operation: '=', Value: "Inactive", Color: 'rgb(47,47,47)', BackgroundColor: 'rgba(47,47,47,0.2)'},
     {Operation: '=', Value: "Outdated", Color: 'rgb(96,63,64)', BackgroundColor: 'rgba(96,63,64,0.2)'},
     {Operation: '=', Value: "Refused", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'},
     {Operation: '=', Value: "Pending", Color: 'rgb(255,166,97)', BackgroundColor: 'rgba(255,166,97,0.3)'},
     {Operation: '=', Value: "Inactive User", Color: 'rgb(47,47,47)', BackgroundColor: 'rgba(47,47,47,0.2)'},
 ]},
    {Name: 'Total Reports', Property: 'totalReports', IsSort: true},
    {Name: 'Last Report', Property: 'lastReportDate', IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
 ];


