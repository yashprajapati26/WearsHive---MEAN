import { NgModule } from '@angular/core';

// add new modules

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminRoutingModule } from './admin.routing.module';
import { TableGridComponent } from './table-grid/table-grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        AdminNavigationComponent,
        AdminDashboardComponent,
        AdminHomeComponent,
        TableGridComponent,
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        AdminRoutingModule,
        FontAwesomeModule,
        NgxPaginationModule,


    ],
    providers: [],
    
})
export class AdminModule { }
