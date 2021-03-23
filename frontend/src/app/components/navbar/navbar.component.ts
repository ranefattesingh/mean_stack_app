import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show("You're logged out!", { 
      cssClass:"alert-success mt-2", 
      timeout: 3000 
    })
    this.router.navigate(['/login'])

  }

}
