import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup(
    {
      firstName:new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      username:new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(8)]),
      phone: new FormControl('',  [Validators.required, Validators.minLength(8)]),
      email: new FormControl('',  [Validators.required, Validators.minLength(8)])
    }
  )
  constructor(private MainService:MainServiceService, private FlashMessages:FlashMessagesService, private router : Router)
   { 
  }

  ngOnInit(): void {
  }
  get f()
  {
      return this.registerForm.controls;
  }
  register ()
  {
    this.MainService.registerUser(this.registerForm.value).subscribe((result:any) => {
      if(result.success)
      {
         this.FlashMessages.show(result.msg, {
           cssClass: 'alert-success',
           timeout: 2000
         })
         window.scrollTo(0, 0);
         setTimeout(() => {
          this.router.navigate(['/login'])
         }, 2000);
         
      }
      else {
        this.FlashMessages.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
         this.router.navigate(['/register'])
        }, 2000);
      }
    })
  }

}
