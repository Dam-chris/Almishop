import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  smartphoneSelected: boolean
  tabletSelected: boolean
  consoleSelected: boolean
  videogameSelected: boolean

  sh1: any = 1
  sh2: any = 1
  sh3: any = 1
  sh4: any = 1
  sh5: any = 1
  sh6: any = 1

  rb1: boolean = true
  rb2: boolean = true
  rb3: boolean = true
  rb4: boolean = true
  rb5: boolean = true
  rb6: boolean = true

  constructor() { }

  ngOnInit(): void {
    this.smartphoneSelected = false
    this.tabletSelected = false
    this.consoleSelected = false
    this.videogameSelected = true
  }

  optionChanged(value) {
    switch (value) {
      case 'smartphone':
        this.smartphoneSelected = true
        this.tabletSelected = false
        this.consoleSelected = false
        this.videogameSelected = false
      break
      case 'tablet':
        this.smartphoneSelected = false
        this.tabletSelected = true
        this.consoleSelected = false
        this.videogameSelected = false
      break
      case 'console':
        this.smartphoneSelected = false
        this.tabletSelected = false
        this.consoleSelected = true
        this.videogameSelected = false
      break
      case 'videogame':
        this.smartphoneSelected = false
        this.tabletSelected = false
        this.consoleSelected = false
        this.videogameSelected = true
      break
    }
  }
}
