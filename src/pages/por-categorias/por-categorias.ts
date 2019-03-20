import { ProductoPage } from './../producto/producto';
import { ProductosProvider } from './../../providers/productos/productos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  categoria: any = {};
  productoPage=ProductoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _ps: ProductosProvider) {

    //obtenemos el objeto pasado como parametro
    this.categoria = this.navParams.get("categoria");
    console.log(this.categoria);
    this._ps.cargar_por_categoria(this.categoria.id);

  }



}
