import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = 'Guardar Cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    //console.log(this.cliente);
  }

  crearCliente() {
    const cliente: Cliente = this.cliente;
    this.clienteService.create(cliente)
      .subscribe( resp => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${resp.nombre} creado con éxito!`, 'success');
      })

    
  }

  

}
