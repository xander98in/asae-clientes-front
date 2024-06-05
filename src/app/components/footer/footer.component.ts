import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public proyecto: any = {
    anio: '2024',
    nombreProyecto: 'Proyecto de classe'
  };

  public tecnologia: any = {
    leyenda: 'WebApp desarrollada con ', 
    tec1: 'Angular',
    tec2: 'Spring5'
  };

  public autor: string = 'ASAE';

}
