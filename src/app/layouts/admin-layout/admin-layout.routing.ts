import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/pages/service/auth.guard'
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { DevicesComponent } from 'src/app/pages/device/devices.component';
import { TablesComponent } from 'src/app/pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate : [AuthGuard] },
    { path: 'configuration',   component: DevicesComponent, canActivate : [AuthGuard] },
    { path: 'tables',         component: TablesComponent, canActivate : [AuthGuard] },
    //{ path: 'icons',          component: IconsComponent, canActivate : [AuthGuard] },
    //{ path: 'maps',           component: MapsComponent, canActivate : [AuthGuard] }
];
