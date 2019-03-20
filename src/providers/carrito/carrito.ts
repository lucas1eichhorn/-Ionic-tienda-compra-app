import { URL_SERVICIOS } from './../../config/url.servicios';

import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//usuario service
import { UsuarioProvider } from './../usuario/usuario';



@Injectable()
export class CarritoProvider {
  items: any[] = [];
  total_carrito: number = 0;
  ordenes: any[] = [];
  constructor(public http: Http,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private storage: Storage,
    private _us: UsuarioProvider
  ) {
    console.log('Hello CarritoProvider Provider');

    //cargamos los productos al carrito que estaban en el local storage previamente
    this.cargar_storage();
    //actualizamos el precio total luego de cargar los productos cargados en el carritos
    this.actualizar_total();
  }



  agregar_carrito(item_agregar: any) {

    //verificar que no exista el item en el arreglo
    for (let item of this.items) {
      if (item.codigo == item_agregar.codigo) {

        //creamos y mostramos un alerta
        this.alertCtrl.create({
          title: "Item ya existe",
          subTitle: item_agregar.producto + ", ya existe en el carrito",
          buttons: ["OK"]
        }).present();
        return;
      }
    }

    //podemos agregar el item
    this.items.push(item_agregar);
    this.actualizar_total();
    this.guardar_storage();
    this.mostrar_mensaje("Agregado al carrito");
  }
  actualizar_total() {
    this.total_carrito = 0;
    for (let item of this.items) {
      this.total_carrito += Number(item.precio_compra);
    }

  }

  remover_item(idx: number) {
    this.items.splice(idx, 1);
    this.guardar_storage();
  }
  realizar_pedido() {
    let data = new URLSearchParams();
    let codigos: string[] = [];
    for (let item of this.items) {
      codigos.push(item.codigo);
    }

    console.log("codigos:");
    console.log(codigos);
    data.append("items", codigos.join(","));
    console.log("codigos:" + codigos.join(","));

    let url = URL_SERVICIOS + `pedidos/realizar_orden/${this._us.token}/${this._us.id_usuario}`;
    this.http.post(url, data).subscribe(resp => {
      let respuesta = resp.json();
      if (respuesta.error) {
        //mostramos error
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'No se pudo enviar la orden',
          buttons: ['OK']
        }).present();
      } else {
        //todo ok
        this.items = [];
        this.alertCtrl.create({
          title: 'Orden realizada',
          subTitle: 'Nos contactaremos con ud proximamente',
          buttons: ['OK']
        }).present();
      }
    })
  }

  //mostramos un mensaje con un toast
  mostrar_mensaje(mensaje: string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  guardar_storage() {
    if (this.platform.is("cordova")) {
      //dispositivo
      this.storage.set("items", this.items);
    } else {
      //PC
      localStorage.setItem("items", JSON.stringify(this.items))
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        //promesa para esperar que el storage este listo para usar
        this.storage.ready().then(() => {
          this.storage.get("items").then(items => {
            if (items) {
              this.items = items;
            }
            resolve();
          })
        })


      } else {
        //PC
        //verificamos si existe la propiedad en el local storage
        if (localStorage.getItem("items")) {
          this.items = JSON.parse(localStorage.getItem("items"));
        }
        resolve();


      }
    })
    return promesa;

  }

  cargar_ordenes() {
    let url = URL_SERVICIOS + `pedidos/obtener_pedidos/${this._us.token}/${this._us.id_usuario}`;
    this.http.get(url).map(resp => resp.json()).subscribe(data => {
      if (data.error) {
        //mostrar alerta error
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'No se pudo recuperar las ordenes',
          buttons: ['OK']
        }).present();
      } else {
        this.ordenes = data.ordenes;
      }
    })
  }
  borrar_orden(orden_id: string) {
    let url = URL_SERVICIOS + `pedidos/borrar_pedido/${this._us.token}/${this._us.id_usuario}/${orden_id}`;
    return this.http.delete(url).map(resp => resp.json());
  }

}
