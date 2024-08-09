import { Component, inject } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators,} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RolesService } from '../../core/services/Login/roles.service';
import { LoginService } from '../../core/services/Login/login.service';
import { Observable } from 'rxjs';
import { Role } from '../../core/interfaces/role';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, MatInputModule,ReactiveFormsModule,MatIconModule,MatSelectModule,AsyncPipe,MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  roleService = inject(RolesService);
  authService = inject(LoginService);
  matSnackbar = inject(MatSnackBar);
  roles$!: Observable<Role[]>;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  errors!: ValidationErrors[];


  register() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.matSnackbar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          this.errors = err!.error;
          this.matSnackbar.open('Error de validacion', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      complete: () => console.log('Registro completado'),
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      direccion: ['', Validators.required],
      }
    );
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

}
