import { Component, OnInit } from '@angular/core';
/**  1 importar el servicio*/
import { MovimientosService, Movimiento } from '../shared/';

import { provide } from '@angular/core';



@Component({
  moduleId: module.id,
  selector: 'movimiento',
  templateUrl: 'movimiento.component.html',
  styleUrls: ['movimiento.component.css'],
  providers: [MovimientosService] // 2 registrar el sevicio en la lista de providers
  // OJO: cada vez que inyecto un servicio se crea una nueva instancia
  // si quiero que sea único debo inyectarlo una sóla vez
  // por ejemplo en el componente raiz
  /*providers: [
    provide(MovimientosService, { useClass: MovimientosService }),
    provide(Movimiento,{useValue:{
      _id: new Date().toDateString(),
      tipo: "Ingreso",
      categoria: "Nómina",
      fecha: new Date(),
      importe: 10
    }
    })
  ]*/
})

export class MovimientoComponent implements OnInit {
  // nos quedamos con las propiedades exclusivas de la vista
  movimiento: Movimiento
  sentidoOrden: number = 1


  /** 3 declarar el servicio en constructor para su inyección*/ 
  constructor(public movimientosService: MovimientosService) {
    // al declararlo como público este parámetro es accesible desde la vista
    //, public movimiento:Movimiento
  }

  ngOnInit() {
     this.movimiento = {
       _id: new Date().toDateString(),
       tipo: "Ingreso",
       categoria: "Nómina",
       fecha: new Date(),
       importe: 0
     }
  }

  guardarMovimiento() {
    // 4 usar servicio
    this.movimientosService.guardarMovimiento(this.movimiento)
  }

  ordenarPor(campo: string) {
    this.sentidoOrden = -1 * this.sentidoOrden
    this.movimientosService.ordenarPor(campo, this.sentidoOrden)
  }

  // TODO: mover fuciones de utilidad a una clase inyectable en un fichero común  
  fecha(cadena) {
    return new Date(cadena)
  }
}

