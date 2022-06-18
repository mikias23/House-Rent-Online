import { Component, OnInit , Input} from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-each-house',
  templateUrl: './each-house.component.html',
  styleUrls: ['./each-house.component.scss']
})
export class EachHouseComponent implements OnInit {


  rentRecord!:any;
  status = 'free'
  @Input() house :any;
  @Input() renter :any;
   indexImage= 0;
   imgSrc : any;


  
  constructor(private stateService: StateService, private router: Router, private flashMessage:FlashMessagesService, private mainService:MainServiceService) { }

  ngOnInit(): void {
   this.imgSrc  = this.house.imagePath[this.indexImage];

  }
  imageSlider()
  {
   this.indexImage++;

   if(this.indexImage === this.house.imagePath.length)
   {
this.indexImage = 0;
   }
   this.imgSrc  = this.house.imagePath[this.indexImage];

    setTimeout(this.imageSlider, 3000 )
  }
  viewHouse()
  {
 
    this.stateService.data = this.house;
    this.router.navigate(['/viewHouse'])

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
      if(record.status === 'Accepted'){
       this.status = 'Accepted'

      }

      }
    })
  }
  response(response:any)
  {

    this.mainService.renterTransactionResponse(response, this.house._id).subscribe((result:any) => {

      if(result.success)
      {
       this.flashMessage.show(result.msg, {
         cssClass:'alert-success',
         timeout:3000
       })
       if(response == 'Rejected')
       {
        this.status = 'free';

       }
       else {
        this.status = 'Accepted';

       }
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass:'alert-danger',
          timeout:3000
        })
      }
    })
  }


}
