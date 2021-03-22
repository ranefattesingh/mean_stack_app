import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String | undefined;
  username: String | undefined;
  email: String | undefined;
  password: String | undefined;

  constructor(
    private validateService: ValidateService, 
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill all fields.', {cssClass: 'alert-danger mt-2', timeout: 2000 })
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please enter valid email address.', {cssClass: 'alert-danger mt-2', timeout: 2000 })
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show("User Account Created, please login to continue.", {cssClass: 'alert-success mt-2', timeout: 2000 })
        this.router.navigate(['/login'])
      } else {
        this.flashMessagesService.show("Something went wrong...", {cssClass: 'alert-danger mt-2', timeout: 2000 })
      }
    });
    return true;
  }
}
