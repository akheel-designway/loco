import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,private router: Router) { }
  currentUser = null;
  ngOnInit(): void {
    this.authenticationService.currentUserSubject.subscribe(result=> {
      this.currentUser = result;
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }


}
