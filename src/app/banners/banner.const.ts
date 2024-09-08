import { of } from "rxjs";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";

export const columns: ColumnDef[] = [
    
    {Name: '#', Property: 'bannerId'},
    {Name: 'Image', Property: 'imageUrl', IsImage: true, IsWide: true},
    {Name: 'Title', Property: 'title'},
    {Name: 'Start Date', Property: 'startDate', Pipe: LocaleDatePipe},
    {Name: 'Expiry Date', Property: 'expiryDate', Pipe: LocaleDatePipe},
    {Name: "Active?", Property: "isActive", IsSort: true, Highlights: [
        {Operation: '=', Value: true, Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
        {Operation: '=', Value: false, Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
    ]},
    {Name: 'URL', Property: 'url'},
    {Name: 'Order', Property: 'displayOrder', IsSort: true},
];
export const menuButtons:DataTableButtonObject[] = [
    {
        Text: 'Delete Banner',
        Icon: 'delete',
        MatColor: 'warn',
    }
];

export const btns: DataTableButtonObject[] = [
    {
        Text: 'Add New Banner',
        Icon: 'add',
        MatColor: 'primary',
    }
]
export const filters: DataTableFilter[] = [
    {
        Type: 'select',
        ControlName: 'IsActive',
        PlaceHolder: 'Active?',
        UpdateOn: 'blur',
        Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Value'
    },
    {
        Type: 'select',
        ControlName: 'IsExpired',
        PlaceHolder: 'Expired?',
        UpdateOn: 'blur',
        Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Value'
    },
    {
        Type: 'select',
        ControlName: 'Started',
        PlaceHolder: 'Started?',
        UpdateOn: 'blur',
        Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Value'
    },
]