import { ProductoPage } from './../producto/producto';
import { ProductosProvider } from './../../providers/productos/productos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-buscar-producto',
  templateUrl: 'buscar-producto.html',
})
export class BuscarProductoPage {
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _ps: ProductosProvider) {
  }

  

}
