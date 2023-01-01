import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private formBuilder : FormBuilder, private auth: AuthenticationService) { }

  error: boolean = false;
  correct: boolean = false;
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(data: any) {
    this.error = false;
    this.correct = false;

    if (!data.valid) {
      this.error = true;
      return;
    }
    this.correct = true;
    let email = data.get('email').value
    let password = data.get('password').value
    this.auth.signInEmailPass(email, password)
    data.reset()
  }

}
