import { CarritoProvider } from './../../providers/carrito/carrito';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdenesDetallePage } from '../ordenes-detalle/ordenes-detalle';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
ordenDetalle=OrdenesDetallePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _cs: CarritoProvider) {
  }

  ionViewWillEnter() {

    console.log('cargando ordenes');
    this._cs.cargar_ordenes();
  }

}
