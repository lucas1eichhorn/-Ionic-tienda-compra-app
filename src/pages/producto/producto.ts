import { CarritoProvider } from './../../providers/carrito/carrito';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
 producto:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public _cs:CarritoProvider) {
    this.producto=this.navParams.get("producto");
    console.log(this.producto);
  }

 
  
}
