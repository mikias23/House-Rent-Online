import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {
  houses= new Array();
  randomChoice:any;
  housesLength:any;
  housesArray = new Array();
  constructor() { }

  ngOnInit(): void {
  }

  getHouses(houses:any)
  {
    this.housesLength = houses.length;
    this.randomChoice;
    this.housesArray = houses;
    if(this.housesLength > 4)
    {
       this.randomChoice = Math.floor(Math.random() * this.housesLength) ;
    
    while( this.houses.length < 4)
    {
      if(this.randomChoice === this.housesLength)
      {
        this.randomChoice = 0
      }
      this.houses.push(houses[this.randomChoice])
        this.randomChoice++;
    }
  }
  else {
    this.houses =  houses;

  }
    
    

  }
  slideLeft()
  {
     this.slider('left')
  }
  slideRight()
  {
    this.slider('right')
  }
  slider(direction:any)
  {
    if(this.housesLength > 4)
    {
      this.houses = [];
   
    if(direction === 'left')
    {
      while( this.houses.length < 4)
      {
        if(this.randomChoice === 0)
        {
          this.randomChoice = this.housesLength - 1;
        }
         this.houses.push(this.housesArray[this.randomChoice])
          this.randomChoice--;
      }
    }
    else{
      while( this.houses.length < 4)
      {
        if(this.randomChoice === this.housesLength)
        {
          this.randomChoice = 0;
        }
         this.houses.push(this.housesArray[this.randomChoice])
          this.randomChoice++;
      }
    }
  }

  }
   

}
