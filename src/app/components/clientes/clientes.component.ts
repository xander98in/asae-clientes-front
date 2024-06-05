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

  actualizar(id: number) {
    this.router.navigate([`/clientes/form/${id}`]);
  }

  eliminar(id: number, nombre: string) {
      Swal.fire({
        title: '¿Está seguro?',
        text: `¿Está seguro que desea eliminar al cliente ${nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.clienteService.eliminar(id)
            .subscribe( resp => {
              Swal.fire({
                title: 'Eliminado!',
                text: `${resp.mensaje}`,
                icon: "success"
              });
              this.cargarClientes();
            })
        }
      });

  }
}
