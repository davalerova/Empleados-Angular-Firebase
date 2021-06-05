import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(private _empeadoService: EmpleadoService,
    private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._empeadoService.getEmpleados().subscribe(data =>{
      this.empleados = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string){
    this._empeadoService.eliminarEmpleado(id).then(() => {
      this.toastr.error('El empleado fue eliminado con éxito', 'Registro eliminado',{
        positionClass: 'toast-bottom-right'
      })
    }).catch(error =>{
      console.log("error");
    })
  }

}
