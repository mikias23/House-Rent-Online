import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControlName, FormArray,FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  delete: string;
}
export interface PeriodicElementHouse {
  type: string;
  city: string;
  location: string;
  purpose: string;
  price: string;
  status: string;
  view:String;
  delete:String;
}

const ELEMENT_DATA: PeriodicElement[] = [

];
const ELEMENT_DATA_HOUSE:PeriodicElementHouse[] = [

]


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})


export class AdminPageComponent implements OnInit {

  editAdminForm= new FormGroup(
    {

      username:new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(8)]),
      firstName:new FormControl('', [Validators.required]),
      lastName:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    }
  )

@ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  users= new Array();

  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'phone', 'delete'];
  displayedColumnsHouse: string[]= ['type', 'city', 'location', 'purpose', 'price', 'status', 'view','delete']

  dataSource = ELEMENT_DATA ;
  dataSourceHouse = ELEMENT_DATA_HOUSE

  

  adminObj!: any;
  adminObjKey= new Array();
  showTableUser =  false;
  houses= new Array();
  arrayLabel = ['first name', 'last name',  'phone', 'username', 'password',  'email' ];
  arrayClassToggler = ['false', 'false', 'false', 'false', 'false', 'false']
  

 ngAfterViewInit()
  {
   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
     if(res.matches)
     {
       this.sidenav.mode = 'over';
       this.sidenav.close()
     }
     else {
       this.sidenav.mode = 'side';
       this.sidenav.open();
     }
   })
  }
  constructor(private mainService: MainServiceService, private flashMessage : FlashMessagesService, private router: Router, private observer: BreakpointObserver ) { }

  ngOnInit(): void { 
 
  }
 
   getUsers(users:any)
   {

    this.users = users;
    this.users.forEach((user:any) => {
      ELEMENT_DATA.push({
        firstName:user.firstName,lastName:user.lastName, username:user.lastName, email:user.email, phone:user.phone, delete: 'icon'
      })
    })
    this.dataSource = ELEMENT_DATA;


   }

   getHouses(house:any)
   {

    this.houses = house;
    this.houses.forEach((house:any) => {
      ELEMENT_DATA_HOUSE.push({
        type:house.type, city:house.city, location: house.location, purpose: house.purpose, price:house.price, status:house.status, view:'view', delete:'icon'
      })
    })
   }
   getAdmin(event:any)
   {
     console.log(event)
    this.adminObj = event[0];
    this.adminObj.password= '***********';
    for(const key in event[0])
    {
      console.log(key)
      if(key !== '_id')
      {
        this.adminObjKey.push(key);

      }
      console.log(this.adminObj)
      console.log(this.adminObjKey)
    }


   }
  
   reset()
   {
     console.log(this.editAdminForm.value)
     this.editAdminForm.reset();
   }
   edit(index:any)
   {
     this.arrayClassToggler[index]= 'true'
   }

   cancel(index:any)
   {
     this.arrayClassToggler[index]= 'false';
     let controlNameCanceled = this.adminObjKey[index];
     this.editAdminForm.value.controlNameCanceled = ''
   }
   editForm()
   {

   }

}
