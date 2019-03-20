import { URL_IMG } from './../../config/url.servicios';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  
  transform(codigo: string) {
    return URL_IMG+codigo+".jpg";
  }
}
