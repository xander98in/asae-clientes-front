import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { CLIENTES } from '../data/clientes.json';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespEliminar } from '../interfaces/resp-eliminar.interface';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:9090';
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
      .pipe(
        catchError( err => {
          if(err.status == 400) {
            return throwError(err)
          }
          console.log(err.error.mensaje);
          swal.fire('Error al crear el cliente', err.error.mensaje, 'error');
          return throwError(err);
        })
      )
  }

  getCliente(id: number) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/api/clientes/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/api/clientes/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  eliminar(id: number): Observable<RespEliminar> {
    return this.http.delete<RespEliminar>(`${this.urlEndPoint}/api/clientes/${id}`);
  }
}
