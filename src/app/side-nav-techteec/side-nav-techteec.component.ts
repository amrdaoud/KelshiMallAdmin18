import { Component, inject } from '@angular/core';
import { IconSideNavComponent } from 'techteec-lib/components/icon-side-nav';
import { IconNavItemWithRoles } from './models/side-nav-techteec';
import { AuthenticationModel } from '../app-reusables/account/models/account';
import { filter, map, Observable, tap } from 'rxjs';
import { AccountService } from '../app-reusables/account/services/account.service';
import { items } from './models/side-nav-techteec.const';
import { AsyncPipe } from '@angular/common';
import { NameCircleComponent } from "../app-reusables/components/name-circle/name-circle.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Unsubscriber } from '../app-reusables/common/unsubscriber';
import { ConfirmService } from '../app-reusables/confirm/services/confirm.service';

@Component({
  selector: 'app-side-nav-techteec',
  standalone: true,
  imports: [IconSideNavComponent, AsyncPipe, NameCircleComponent, MatMenuModule, MatIconModule,RouterLink],
  templateUrl: './side-nav-techteec.component.html',
  styleUrl: './side-nav-techteec.component.scss'
})
export class SideNavTechteecComponent extends Unsubscriber {
  private accountService = inject(AccountService);
  private confirm = inject(ConfirmService);
  private router = inject(Router);
  authData$ = this.accountService.account$;
  get authItems$(): Observable<IconNavItemWithRoles[]> {
    return this.authData$.pipe(
      map(data => this.getItemsByRoles(items, data!)!)
    )
  }
  getItemsByRoles(items: IconNavItemWithRoles[] | undefined, auth: AuthenticationModel | undefined): IconNavItemWithRoles[] | undefined {
    if(auth?.roles.includes('Super User')) {
      return items;
    }
    return items?.filter(x => !x.roles || x.roles.length === 0 || x.roles.find(r => auth?.roles?.includes(r.toLowerCase()))).map(x => {
      if(x.children && x.children.length > 0) {
        x.children = this.getItemsByRoles(x.children, auth);
        return x;
      } else {
        return x
      }
    })
    
  }
  logOut() {
    this._otherSubscription = this.confirm.open({Title: 'Logout', Message: 'Are you sure you want to logout', MatColor: 'warn'}).pipe(
        filter(result => result),
        tap(() => {
            this.accountService.logOut();
        })
    ).subscribe(x => {
        this.router.navigateByUrl('/login');
    });
    
 }
}
