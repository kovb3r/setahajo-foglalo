import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });
  
  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router, private authService: AuthService) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      this.signupError = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      name: {
        firstname: this.signUpForm.value.name?.firstname || '',
        lastname: this.signUpForm.value.name?.lastname || ''
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      foglalas: [],
    };

    console.log('New user:', newUser);
    console.log('Form value:', this.signUpForm.value);

    this.authService.signup(newUser.email, newUser.password, `${newUser.name.firstname} ${newUser.name.lastname}`)
  .then(() => {
    this.router.navigateByUrl('/');
  })
  .catch((error) => {
    this.signupError = 'Registration failed. ' + (error.message || '');
    this.isLoading = false;
    this.showForm = true;
  });
  }
}