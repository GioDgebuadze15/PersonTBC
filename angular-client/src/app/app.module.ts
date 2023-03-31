import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import { PeopleTableComponent } from './components/people-table/people-table.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { LoginComponent } from './pages/login/login.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PeopleTableComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
