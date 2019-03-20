import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from './../../config/url.servicios';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductosProvider {
  pagina: number = 0;
  productos: any[] = [];
  lineas: any[] = [];
  por_categoria: any[] = [];
  items_busqueda: any[] = [];
  constructor(public http: Http) {
    console.log('Hello ProductosProvider Provider');
    this.cargar_todos();
    this.cargar_lineas();
  }
  //cargamos la categorias de productos
  cargar_lineas() {
    let promesa = new Promise((resolve, reject) => {
      let url = URL_SERVICIOS + "lineas";
      this.http.get(url).map(respuesta => respuesta.json()).subscribe(data => {
        console.log(data);
        if (data.error) {

        } else {

          this.lineas = data.lineas

          console.log(this.lineas);

        }
        resolve();
      })
    })
    return promesa;
  }
  //cargamos los productos de la categoria pasado por parametro
  cargar_por_categoria(categoria: number) {
    let promesa = new Promise((resolve, reject) => {

      let url = URL_SERVICIOS + "productos/por_tipo/" + categoria;
      this.http.get(url).map(respuesta => respuesta.json()).subscribe(data => {
        if (data.error) {

        } else {
          this.por_categoria = data.productos;
          console.log("listado productos por categoria:" + categoria);
          console.log(this.por_categoria);
        }
      });
      resolve();
    })
    return promesa;
  }

  //cargamos todos los productos (paginado)
  cargar_todos() {
    let promesa = new Promise((resolve, reject) => {
      //cargar productos paginados
      let url = URL_SERVICIOS + "productos/todos/" + this.pagina
      this.http.get(url)
        .map(respuesta => respuesta.json()).subscribe(data => {
          console.log(data)
          if (data.error) {

          } else {

            let nuevaData = this.agrupar(data.productos, 2);
            this.productos.push(...nuevaData);
            this.pagina += 1;
            console.log(this.productos);

          }
          resolve();
        });
    });
    return promesa;

  }
  //separa un array de objetos en un array de objetos agrupados en un array como elemento 
  private agrupar(arr: any, tam: number) {
    let arr_nuevo = [];
    for (let i = 0; i < arr.length; i += tam) {
      arr_nuevo.push(arr.slice(i, i + tam));
    }
    console.log("arr:");
    console.log(arr_nuevo);
    return arr_nuevo;

  }

  //buscamos productos por string
  buscar_producto(ev: any) {
    const val = ev.target.value;
    console.log("buscar:" + val);
    if (val && val.trim() != '') {
      let promesa = new Promise((resolve, reject) => {
        //cargar productos paginados
        // set val to the value of the searchbar

        let url = URL_SERVICIOS + "productos/buscar/" + val

        this.http.get(url)
          .map(respuesta => respuesta.json()).subscribe(data => {
            console.log(data)
            if (data.error) {

            } else {
              this.items_busqueda = data.productos;
              console.log(data.productos);


            }
            resolve();
          });
      });
      return promesa;
    }else{
      this.items_busqueda =[];
    }


  }
}
