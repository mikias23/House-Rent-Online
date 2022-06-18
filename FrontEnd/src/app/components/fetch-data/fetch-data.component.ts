import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent implements OnInit {

  @Output() houses: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() rentRecords: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() users: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() admin: EventEmitter<Object> = new EventEmitter<Object>();
    constructor(private mainService:MainServiceService) { }

  ngOnInit(): void {
    this.mainService.fetchHouses().subscribe((data:any)=> {
      if(data.success)
      {
        this.houses.emit(data.houses)
      console.log(data.houses)
      }
      else {
        this.houses.emit()

      }
    })
    this.mainService.fetchRentRecords().subscribe((data:any)=> {
      if(data.success)
      {
        this.rentRecords.emit(data.rentRecords)
      console.log(data.rentRecords)
      }
      else {
        this.houses.emit('')

      }
    })
    this.mainService.fetchAdmin().subscribe((data:any) => {
      console.log(data)
      if(data.success)
      {
        this.admin.emit(data.admin)
      }
      else {
        this.admin.emit('')

      }
    })
    this.mainService.fetchUser().subscribe((data:any) => {
      if(data.success)
      {
        this.users.emit(data.users)
      console.log(data.users)
      }
      else {
        this.users.emit('')

      } 
    })

  }



}
