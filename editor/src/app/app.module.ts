import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { RecipientComponent } from './recipient/recipient.component';
import { DonorComponent } from './donor/donor.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    VolunteerComponent,
    RecipientComponent,
    DonorComponent
  ],
  imports: [
    AlertModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
