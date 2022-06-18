import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { FlashMessagesService } from 'flash-messages-angular';
@Component({
  selector: 'app-each-house-displayer',
  templateUrl: './each-house-displayer.component.html',
  styleUrls: ['./each-house-displayer.component.scss']
})
export class EachHouseDisplayerComponent implements OnInit {
   
  status= "free";
  house:any;
  images= new Array()
  details = false;
  screenWidth!:any;
  rentRecord !: any;
  constructor(private stateService: StateService, private router: Router, public dialog: MatDialog, private flashMessage: FlashMessagesService) {


   }
   
   detail()
   {
     this.details = !this.details;

   }
  ngOnInit(): void {

    this.screenWidth = window.innerWidth; 
        this.house = this.stateService.data;
        if(this.screenWidth > 768 )
        {
         this.details = true
        }
        if(this.house == null)
        {
          this.router.navigate([''])

        }
        else {
          for(let i = 0 ; i < this.house.imagePath.length; i++)
        {
           this.images.push(this.house.imagePath[i])
        }

        }
  }

  rentHouse()
  {
    let dialogRef = this.dialog.open(DialogComponent, {data: {houseId: this.house._id}});

    dialogRef.afterClosed().subscribe((result:any) => {

    if(result)
    {
      this.flashMessage.show('Updated', {
        cssClass: 'alert-success',
        timeout: 3000
      })

      this.status = 'Requested'

    }
    else {
      this.flashMessage.show('Not Updated', {
        cssClass: 'alert-danger',
        timeout: 3000
      })
    }
     
    })
  }
  onResize(event:any)
  {
  
    if(  event.target.innerWidth > 768)
    {
      this.details = true
    }
    else {
      this.details = false;
    }
  }
  
  rentRecords(records:any)
  {
    
     records.forEach((record:any) => {
       if(record.houseId === this.house._id)
       {
        this.rentRecord = record;
       if(record.status === 'request')
       {
         this.status = 'Requested'
       }
       if(record.status === 'accepted'){
        this.status = 'Accepted'

       }

       }
     })
  }
  

}
