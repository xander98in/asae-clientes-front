import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { CLIENTES } from '../../data/clientes.json';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  /* clientes: Cliente[] = [
    {id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@unicauca.edu.co', createAt: '2021-05-14'},
    {id: 2, nombre: 'Andres', apellido: 'Sanchez', email: 'juan@unicauca.edu.co', createAt: '2021-05-14'},
    {id: 3, nombre: 'Pedro', apellido: 'Cortez', email: 'juan@unicauca.edu.co', createAt: '2021-05-14'},
  ];
 */
  clientes: Cliente[] = []; 

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.cargarClientes();
   
  }

  private cargarClientes() {
    this.clienteService.getClientesObservable()
      .subscribe( clientes => {
        this.clientes = clientes;
      })
  }
  
  crearCliente() {
    this.router.navigate(['/clientes/form'])
  }

  eliminar(id: number) {
    this.clienteService.eliminar(id)
      .subscribe( resp => {
        Swal.fire('Cliente Eliminado', `${resp.mensaje}`, 'success');
        this.cargarClientes();
        
      })
  }
}
