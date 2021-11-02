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

  constructor() { }

  ngOnInit(): void {
    this.smartphoneSelected = true
    this.tabletSelected = false
    this.consoleSelected = false
    this.videogameSelected = false
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
