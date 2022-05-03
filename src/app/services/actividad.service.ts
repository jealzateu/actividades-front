import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private buscarActividades: string = "http://localhost:8080/actividades/buscar";
  private guardarActividades: string = "http://localhost:8080/actividades/guardar";
  private actualizarActividades: string = "http://localhost:8080/actividades/actualizar";
  private eliminarActividades: string = "http://localhost:8080/actividades/eliminar";

  constructor(private _httpClient: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    })
};

  getActividades(): Observable<Actividad[]> {
    return this._httpClient.get<Actividad[]>(this.buscarActividades).pipe(
      map(response => response)
    );
  }

  saveActividades(actividad: any): Observable<Actividad> {
    return this._httpClient.post<Actividad>(this.guardarActividades, actividad, this.httpOptions);
  }

  getActividad(id: number): Observable<Actividad> {
    return this._httpClient.get<Actividad>(`${this.buscarActividades}/${id}`).pipe(
      map(response => response)
    );
  }

  updateActividad(id: number, actividad: any): Observable<any> {
    return this._httpClient.put<Actividad>(`${this.actualizarActividades}/${id}`, actividad,  this.httpOptions);
  }

  deleteActividad(id: number): Observable<any> {
    return this._httpClient.delete(`${this.eliminarActividades}/${id}`, {responseType: 'text'});
  }

}
