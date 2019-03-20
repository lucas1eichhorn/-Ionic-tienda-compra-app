
import { ProductosProvider } from './../../providers/productos/productos';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { CarritoProvider } from './../../providers/carrito/carrito';
import { ProductoPage } from './../producto/producto';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//paginas del modal
import { CarritoPage } from './../../pages/carrito/carrito';
import { LoginPage } from './../../pages/login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, public _ps: ProductosProvider, public _cs: CarritoProvider, private modalCtrl: ModalController, public _us: UsuarioProvider) {

  }
  siguiente_pagina(infiniteScroll) {
    this._ps.cargar_todos().then(() => {

      infiniteScroll.complete();
    })
  }

  ver_carrito() {
    let modal: any;
    if (this._us.token) {
      //si el token existe, esta logueado
      //creamos un modal con la pagina pasada como parametro
      modal = this.modalCtrl.create(CarritoPage);


    } else {
      //si el token NO existe, NO esta logueado
      modal = this.modalCtrl.create(LoginPage);
    }
    //mostramos el modal creado anteriormente
    modal.present();

    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage);
        modal.present();
      }
    })

  }


}
