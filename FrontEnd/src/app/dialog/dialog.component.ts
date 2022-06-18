import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MainServiceService } from '../services/main-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  min = new Date();
  max = new Date();
  endDate = new Date();
  rentPlan = 90
  rentInfo = new FormGroup(
    {
      clientPhone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      rentPlan: new FormControl('3 Months', [Validators.required]),
      dateStart:new FormControl(new Date(), [Validators.required]),
      status: new FormControl('request',  [Validators.required]),

    }
  )
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private mainService: MainServiceService, private dialogRef: MatDialogRef<DialogComponent> ) { }
  ngOnInit(): void {
    this.rentInfo.addControl('houseId', new FormControl(this.data.houseId, Validators.required)); 

    this.max.setDate(this.min.getDate() + 5);
    this.endDate.setDate((this.rentInfo.controls['dateStart'].value).getDate() + 90);
    this.rentInfo.addControl('dateEnd', new FormControl(this.endDate, Validators.required)); 
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.endDate = new Date();
    var span = 90

   this.rentInfo.removeControl('dateEnd');

    switch(this.rentInfo.controls['rentPlan'].value){

      case '3 Months':
        {
          span = 9
          break;
        }
       case '6 Months': 
       {
        span = 18
        break;

       }
       case '12 Months':{
        span = 36
        break;

       }
    }
    let tempoStartDate = this.rentInfo.controls['dateStart'].value;
    console.log(span)
    console.log('datStart' + tempoStartDate)
    console.log('datStartGetTime' + tempoStartDate.getTime())
    console.log('datStartGetTime' + tempoStartDate.getDate())

    this.endDate.setDate(tempoStartDate.getTime() + (span*60*1000));

    this.rentInfo.addControl('dateEnd', new FormControl(this.endDate, Validators.required)); 

  }
  submitForm()
  {

    this.mainService.rentTransaction(this.rentInfo.value).subscribe((data:any) => {
      if(data.success)
      {
   
        this.dialogRef.close(true)

      }
      else {
        this.dialogRef.close(false)

      }

  
    
    } )
  }

  get f()
  {
      return this.rentInfo.controls;
  }
  close()
  {
    this.dialogRef.close(false)

  }

}
