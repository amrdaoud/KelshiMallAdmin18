import { IconNavItem } from "techteec-lib/components/icon-side-nav";

export interface SideNavElement {
    Name: string,
    Route?: string;
    Icon: string;
    Children?: SideNavElement[];
    Roles?: string[] 
}
