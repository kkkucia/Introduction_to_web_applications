import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ex5',
  templateUrl: './ex5.component.html',
  styleUrls: ['./ex5.component.scss']
})
export class Ex5Component implements OnInit{

  constructor () {}
  showBrands = true;
  showModels = false;
  showColors = false;
  showMessage = false;

  json:any;

  chosenBrand:string | undefined;
  chosenModel:string | undefined;
  chosenColor:string | undefined;

  brands = new Set<string>();
  models = new Set<string>();
  colors = new Set<string>();
 

  ngOnInit(): void {
    fetch(`./assets/cars.json`)
      .then(res => res.json())
      .then(res => {
        this.json = res;

        for (let i in this.json.cars){
          this.brands.add(this.json.cars[i].brand)
        }
    })
  }

  brandSelected(){
    this.models.clear();
    for (let i in this.json.cars){
      if (this.json.cars[i].brand == this.chosenBrand){
        this.models.add(this.json.cars[i].model)
      }
    }
    this.showModels = true;
    this.showMessage = false;
    this.showColors = false;
  }  

  modelSelected(){
    this.colors.clear();
    for (let i in this.json.cars){
      if (this.json.cars[i].model == this.chosenModel){
          this.colors.add(this.json.cars[i].color)
      }
    }
    this.showColors = true;
  }

  colorSelected(color:string){
    this.chosenColor = color;
    this.showMessage = true;
  }
}
