import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public mainService: MainServiceService, private router: Router, private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }
  links = false;


  showLinks()
  {
    this.links = !this.links
  }
  hideLinks()
  {
    this.links = !this.links
  }
  userLoggedOut(){
    this.mainService.logOut();
    this.flashMessage.show('Logged Out', {
      cssClass:"alert-success",
      timeout: 3000
    })
    this.router.navigate(['/login']);
    return false;
  }

}
