import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//pipes
import { ImagenPipe } from './../pipes/imagen/imagen';

import { UsuarioProvider } from './../providers/usuario/usuario';
import { ProductosProvider } from './../providers/productos/productos';

import { CarritoProvider } from '../providers/carrito/carrito';
//paginas
import { CarritoPage,CategoriasPage,HomePage,LoginPage,OrdenesPage,OrdenesDetallePage,PorCategoriasPage,ProductoPage,TabsPage,BuscarProductoPage } from './../pages/index.pages';
//storage
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    CarritoPage,
    CategoriasPage,
    HomePage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarProductoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarritoPage,
    CategoriasPage,
    HomePage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarProductoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
