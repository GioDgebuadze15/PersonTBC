import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AddPersonComponent} from "./components/add-person/add-person.component";
import {EditPersonComponent} from "./components/edit-person/edit-person.component";
import {AuthGuard} from "./auth/AuthGuard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-person', component: AddPersonComponent, canActivate: [AuthGuard]},
  {path: 'edit-person/:id', component: EditPersonComponent,canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
