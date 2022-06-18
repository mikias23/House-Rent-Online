import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router'
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  userHouses:any;
  loginForm = new FormGroup(
    {

      username:new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(4)]),
      type:new FormControl('admin', [Validators.required])
    }
  )
  constructor(private stateService: StateService,private MainService:MainServiceService, private FlashMessages:FlashMessagesService, private router : Router) { }

  ngOnInit(): void {
  }

  login()
  {

    this.MainService.loginUser(this.loginForm.value).subscribe((data:any) => {
      if(data.success)
      {
          this.MainService.storeUserData(data.token, data.user);
          this.FlashMessages.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
          this.stateService.data = this.userHouses;

          this.router.navigate(['/adminPage'])
      }
      else 
      {
        this.FlashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        window.scroll(0,0)
        this.router.navigate(['/admin'])

      }
    })
  
}
  
  get f()
  {
      return this.loginForm.controls;
  }
  getHouses(houses:any)
  {
    houses.forEach((house:any) => {
       this.userHouses.push(house);      
     });

       
  }
}
