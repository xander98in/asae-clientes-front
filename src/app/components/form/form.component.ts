import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = 'Guardar Cliente';
  public errores: string[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    //console.log(this.cliente);
    this.cargarCliente();
  }

  private cargarCliente() {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.clienteService.getCliente(id) )
      )
      .subscribe( cliente => {
        this.cliente = cliente;
      });
  }

  crearCliente() {
    const cliente: Cliente = this.cliente;
    this.clienteService.create(cliente)
      .subscribe({
        next: (resp) => {
          this.router.navigate(['/clientes']);
          swal.fire('Nuevo cliente', `Cliente ${resp.nombre} creado con éxito!`, 'success');
        },
        error: (err) => {
          this.procesarErrores(err.error);
          console.error('Codigo del error desde el backend: ' + err.status);
        }
      });
  }

  private procesarErrores(obj: { [key: string]: string }): void {
    this.errores = Object.entries(obj).map(([key, value]) => `${key}: ${value}`);
  }

  update(): void {
    const cliente: Cliente = this.cliente;
    this.clienteService.update(cliente)
      .subscribe( cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success');
      });
  }
}
