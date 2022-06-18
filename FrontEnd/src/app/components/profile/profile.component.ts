import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControlName, FormArray,FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import {BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';

 @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

     @ViewChild(MatSidenav)
      sidenav!: MatSidenav;
      

  // will be updated dynamically later 
  userHouses = new Array()
  images:any;
  user!:any;
  uploadableSize!:Number;
  imageDisplayer: any;
  roomTypeSelectedIndex:any;
  arrayImages= new Array();
  renter="renter";

  roomTypeSelected: any;
  constructor(private mainService: MainServiceService, private flashMessage : FlashMessagesService, private router: Router, private observer: BreakpointObserver ) { }

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
 ngOnInit() {

    this.user = JSON.parse(this.mainService.getProfile());
  
 }

  houseTypeSelected = 'condominium';
  location = [[], ['Gerji', 'Bole' , 'Megenagna', 'Summit'],  ['Kebele 1', 'Dipo' , 'Kebele 3', 'Abay Mado'], ['Hayk', 'kebele 2' , 'menahrya', 'Kebele 4'], ['kebele 1', 'Blco' , 'Chat Gebeya', 'universiy'] ];
  citySelected = false ;
  yard = false;
  pool = false;
  firstCompleted =false;
  secondCompleted =false;
  locationToBeDisplayed = new Array();
  imgSrc:any;


  uploadFormBasic = new FormGroup(
    {
      status:new FormControl('rent', [Validators.required]),
      purpose:new FormControl('living', [Validators.required]),
      type: new FormControl('condominium',[Validators.required]),
      city: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required])
    }
  )
  uploadFormDetail = new FormGroup(
    {
      price:new FormControl('', [Validators.required]),
      rentPlan: new FormControl('3 Months', [Validators.required]),
      bedRoom: new FormControl('1', Validators.required),
      floor: new FormControl('', Validators.required)       }
  )
  uploadFormUpload = new FormGroup(
    {
      images : new FormArray([
        new FormGroup({
          imageType: new FormControl('frontImage'),
          image: new FormControl('')
        }),
        new FormGroup({
          imageType: new FormControl('livingRoom'),
          image: new FormControl('')
        })
      ]),

    }
  )


  get f()
{
    return this.uploadFormBasic.controls;
}
get fDetail()
{
    return this.uploadFormDetail.controls;
}
get fUpload()
{
    return this.uploadFormUpload.controls;
}

onTypeChange(event:any)
{
  
  this.uploadFormDetail = new FormGroup(
    {
      price:new FormControl('', [Validators.required]),
      rentPlan: new FormControl('3 Months', [Validators.required])    }
  )
  switch(event)
  {
    case 'condominium':
      {
        this.houseTypeSelected = 'condominium'
        this.uploadFormDetail.addControl('bedRoom', new FormControl('1', Validators.required)); 
        this.uploadFormDetail.addControl('floor', new FormControl('', Validators.required)); 

         break;
      }
    case 'apartment':
      {
        this.houseTypeSelected = 'apartment'
       console.log('apartment')
        this.uploadFormDetail.addControl('bedRoom', new FormControl('1', Validators.required)); 
        this.uploadFormDetail.addControl('floor', new FormControl('', Validators.required)); 
        break;
      }
    case 'dorm':
      {
        this.houseTypeSelected = 'dorm'

        this.uploadFormDetail.addControl('area', new FormControl('', Validators.required)); 
        break;
      } 
    case 'villa':
        {
          this.houseTypeSelected = 'villa'

          this.uploadFormDetail.addControl('stairs', new FormControl('', Validators.required)); 

          this.uploadFormDetail.addControl('pool', new FormControl(false, Validators.required)); 
          this.uploadFormDetail.addControl('yard', new FormControl(false, Validators.required)); 
          this.uploadFormDetail.addControl('rooms', new FormControl('', Validators.required)); 
          break;

        }   
  }
 
}
// city selected function to update location based on city change 
citySelectedFunc(event:any)
{
   this.citySelected = true;
   let index = 0;
    switch(event)
    {
      case 'Addis Ababa':
        {
         index = 1;
          break;
        }
       case 'Bahir Dar':
        {
          index = 2;
            break;
        }
        case 'Hawassa':
          {
            index = 3;

            break;
          }
        case 'Adama':
            {
              index = 4
              break;
            }
      
    }
    for(let i = 0 ; i < this.location[index].length; i++)
    {
      this.locationToBeDisplayed.push(this.location[index][i]);
    }
}
locationSelectedFunc(event:any)
{
  this.firstCompleted = true;
}
stepOneCompleted()
   {}
stepTwoCompleted(event:any)
{
  this.secondCompleted = true; 
}
clearImageUpoadsFirst()
{
  this.uploadFormUpload.removeControl('images');
  this.uploadFormUpload.addControl('images', new FormArray([
    new FormGroup({
      imageType: new FormControl('frontImage'),
      image: new FormControl('', Validators.required)
    }),
    new FormGroup({
      imageType: new FormControl('livingRoom'),
      image: new FormControl('', Validators.required)
    })
  ])); 
}

populateUploadables(length:any)
 {
  const images = this.uploadFormUpload.get('images') as FormArray
  this.images = images;

    for(let i = 0 ; i< length; i++)
    {
      images.push( new FormGroup({
        imageType: new FormControl(''),
        image: new FormControl('')
      }))
    }
 }
rooms(event:any)
{
  this.clearImageUpoadsFirst();
  this.uploadableSize = event.target.value;
  this.arrayImages = new Array(event.target.value+ 2)

  this.populateUploadables(event.target.value)
}
bedRooms(event:any)
{
  console.log(this.uploadFormDetail.value)
  this.clearImageUpoadsFirst();
  this.populateUploadables(event);
  this.uploadableSize = event;


  this.arrayImages = new Array(event+ 2)

  
}
poolChecked($event:any)
{
this.pool = !this.pool
 const images = this.uploadFormUpload.get('images') as FormArray;
 if(this.pool )
 { 
     images.push( new FormGroup({
      imageType: new FormControl('pool'),
      image: new FormControl('')
    }))
 }
 else{
  images.removeAt(images.value.findIndex((image:any) => image.imageType === 'pool'))
 }

}
yardChecked(event:any)
{
this.yard = !this.yard;
const images = this.uploadFormUpload.get('images') as FormArray;
if(this.yard)
{
  images.push( new FormGroup({
    imageType: new FormControl('yard'),
    image: new FormControl('')
  }))
}
else
{
images.removeAt(images.value.findIndex((image:any) => image.imageType === 'yard'))
}
}
 onAddImage( index:number, type: any, event: any) {
   const images = this.uploadFormUpload.get('images') as FormArray;
   const reader:any = new FileReader();
   if(event.target.files && event.target.files.length) {
     const [file] = event.target.files;
     reader.readAsDataURL(file);

   if(type == 'frontImage' || type == 'livingRoom' || type == 'pool' || type == 'yard')
   {
    this.imageDisplayer = type;
    reader.onload = () => {
      this.imgSrc = reader.result as string;
 
     for (let control of images.controls) {
       if (control instanceof FormGroup) {
         if(control.controls["imageType"].value === type)
         {
            if(type === "frontImage")
            {
              this.arrayImages[0]=(event.target.files[0])

            }
            else if (type === "livingRoom")
            {
              this.arrayImages[1]=(event.target.files[0])

            }
            else {
              let i = 3
              if (type === "yard")
              {
                
                this.arrayImages[i]=(event.target.files[0]);
                i++

              }
              if(type === "pool")
              {
                this.arrayImages[i]=(event.target.files[0])

              }


            }


        }
          } 
    }
}

   }
   else {
    this.imageDisplayer = index;
    if(type == "roomsImage" && this.roomTypeSelectedIndex !==index )
    {
       this.flashMessage.show('Choose Image first for the label you filled', {
         cssClass:'alert-danger',
         timeout:4000
       });
       return
    }

    reader.onload = () => {
      this.imgSrc = reader.result as string;
      console.log(reader.result)
      if(type == "roomsImage")
      {
        let i = 2
        if(this.yard )
        {
         i++
        }
        if(this.pool ) 
        {
         i++
        }
        this.arrayImages[index+i]= event.target.files[0];

        

      }
      else {
        let newType:any = 'Bed Room ' + index;
       let newIndex = index +1;
       console.log(newIndex);
         (images.at(newIndex) as FormGroup).patchValue({imageType:newType});
        
          this.arrayImages[index+2]= event.target.files[0];
    
        
      }
  
    }
   }
     }
 }

createRange(number:any)
{
   var items: number[] = []
   for(var i = 1; i<= number; i++)
   {
     items.push(i)
   }
   return items;
}
 roomType(event:any, i:any)
 {
    this.roomTypeSelectedIndex= i;
    this.roomTypeSelected = event
 }

 onSubmitAll()
 {

   const details = this.uploadFormDetail.value;
   const basic = this.uploadFormBasic.value;

   for (const key in details)
   { 
     this.uploadFormUpload.addControl(`${key}`, new FormControl(details[key], Validators.required)); 

   }
   
   for (const key in basic)
   { 
     console.log(`${key}: ${basic[key]}`);
     this.uploadFormUpload.addControl(`${key}`, new FormControl(`${basic[key]}`, Validators.required)); 

   }
   this.mainService.uploadHouse(this.uploadFormUpload.value, this.arrayImages).subscribe((data:any) => {
     if(data.success)
     {
      window.scrollTo(0, 0);
    

       this.flashMessage.show(data.msg, {
         cssClass:'alert-success',
         timeout:3000
       })
       window.location.reload();
     
     }
     else {
      window.scrollTo(0, 0);
    
      this.flashMessage.show(data.msg, {
        cssClass:'alert-danger',
        timeout:3000
      })
      setTimeout(()=> {
        this.router.navigate(['/'])

      }, 3000)

     }
   })
 }


 getHouses(houses:any)

 {
   console.log(this.user)
    houses.forEach((house:any) => {

     
     if(this.user._id === house.userID )
     {
      this.userHouses.push(house);
        console.log(house)
     }
      

    });

 }


}
