import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { CLIENTES } from '../data/clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespEliminar } from '../interfaces/resp-eliminar.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8085';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  getClientes(): Cliente[] {
    return CLIENTES;
  }

  getClientesObservable(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/api/clientes`);
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.urlEndPoint}/api/clientes`, cliente ,{headers: this.httpHeaders})
  }

  eliminar(id: number): Observable<RespEliminar> {
    return this.http.delete<RespEliminar>(`${this.urlEndPoint}/api/clientes/${id}`);
  }
}
