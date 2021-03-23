import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service'
import{ Router } from '@angular/router'
import{ FlashMessagesService } from 'angular2-flash-messages'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String | undefined
  password: String | undefined

  constructor(
    private authService : AuthService,
    private router : Router,
    private flashMessageService: FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.user)
        this.flashMessageService.show("You're logged in", { cssClass:"alert-success mt-2", timeout: 3000 })
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessageService.show(data.msg, { cssClass:"alert-danger mt-2", timeout: 3000 })
      }
    })
  }
}
