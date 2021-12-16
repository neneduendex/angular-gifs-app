import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifspageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [
    GifspageComponent,
    BusquedaComponent,
    ResultadosComponent
  ],
  exports: [
    GifspageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
