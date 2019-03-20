import { HomePage,CategoriasPage,OrdenesPage,BuscarProductoPage } from './../index.pages';
import { Component } from '@angular/core';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1=HomePage;
  tab2=CategoriasPage;
  tab3=OrdenesPage;
  tab4=BuscarProductoPage;

 

}
