import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Qgj0jnIxXHITlEa6I53YddaQHjfmI1Jr';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    //Get localStorage
    //localStorage.getItem('historial');

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    //if(localStorage.getItem('historial')) {
    //  this._historial = JSON.parse(localStorage.getItem('historial')! || []);
    //}
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    //No repetidos
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //Solo 10
      this._historial = this._historial.splice(0,9);
      //Guardar en localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    //Peticion HTTP
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      });
  }
}
