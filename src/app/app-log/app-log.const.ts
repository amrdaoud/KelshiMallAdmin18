import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { AppLogFilterModel } from "./app-log";

export const appLogConst : 
{columns: ColumnDef[], initialFilter?: AppLogFilterModel,buttons?: DataTableButtonObject[], filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], selectBtns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "#", Property: "appLogId", IsSort: true},
        {Name: "Date", Property: "logDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "App Version", Property: "appVersion", IsSort: true},
        {Name: "Platform", Property: "platform", IsSort: true},
        {Name: "Device", Property: "deviceType", IsSort: true},
        {Name: "Device Name", Property: "deviceName", IsSort: true},
        {Name: "Version", Property: "version", IsSort: true},
        {Name: "User#", Property: "userId", IsSort: true},
        {Name: "Mobile", Property: "mobileNumber", IsSort: true},
        {Name: "Error", Property: "error", IsSort: true, isWrap: true, Tooltip: 'error'}
    ],
    filters: [
        {
            Type: 'twoDates',
            ControlName: 'DateFrom',
            ControlName2: 'DateTo',
            PlaceHolder: 'From',
            PlaceHolder2: 'To',
            UpdateOn: 'blur'
        }
    ]
}