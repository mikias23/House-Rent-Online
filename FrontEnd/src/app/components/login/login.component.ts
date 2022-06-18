import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup(
    {

      username:new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(8)])
    }
  )
  constructor(private MainService:MainServiceService, private FlashMessages:FlashMessagesService, private router : Router) { }

  ngOnInit(): void {
  }
  get f()
{
    return this.loginForm.controls;
}
  login()
  {
    

      this.MainService.loginUser(this.loginForm.value).subscribe((data:any) => {
        if(data.success)
        {
          console.log(data.user)
            this.MainService.storeUserData(data.token, data.user);
            this.FlashMessages.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/profile'])
        }
        else 
        {
          this.FlashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          window.scroll(0,0)
          this.router.navigate(['/login'])
  
        }
      })
    
  }

}
