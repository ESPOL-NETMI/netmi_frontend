import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/pages/service/auth.guard'
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { DevicesComponent } from 'src/app/pages/device/devices.component';
import { TablesComponent } from 'src/app/pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    DevicesComponent,
    TablesComponent,
    //IconsComponent,
    //MapsComponent
  ],
  providers: [AuthGuard],
})

export class AdminLayoutModule {}
