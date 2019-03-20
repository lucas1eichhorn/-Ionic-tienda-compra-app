import { CarritoProvider } from './../../providers/carrito/carrito';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  orden: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public _cs: CarritoProvider, private alertCtrl: AlertController) {
    this.orden = this.navParams.get("orden");
  }
  borrar_orden(orden_id: string) {
    this._cs.borrar_orden(orden_id).subscribe(data => {
      if (data.error) {
        //mostrar alerta error
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'No se pudo borrar la orden',
          buttons: ['OK']
        }).present();
      } else {
        //pop para volver a la pagina anterior
        this.navCtrl.pop();
      }
    })

  }

}
