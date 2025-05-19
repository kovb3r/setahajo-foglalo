import { Routes } from '@angular/router';
import { HajokComponent } from './pages/hajok.component';
import { FoglalasComponent } from './pages/foglalas.component';
import { SignupComponent } from './pages/signup.component';
import { LoginComponent } from './pages/login.component';
import { ProfileComponent } from './pages/profile.component';

export const routes: Routes = [
  { path: '', component: HajokComponent },
  { path: 'foglalas/:id', component: FoglalasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent }, // ide
  { path: '**', redirectTo: '' }
];

