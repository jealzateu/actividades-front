import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actividad, Empleado } from 'src/app/models/actividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-listar-actividades',
  templateUrl: './listar-actividades.component.html',
  styleUrls: ['./listar-actividades.component.css']
})
export class ListarActividadesComponent implements OnInit {

  public actividades: Actividad[] = [];
  public columnas: string[] = ['estado', 'fecha', 'empleadoAsignado', 'diasRetraso', 'acciones'];

  constructor(
    private _actividadService: ActividadService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.consultarActividades();
    this.consultarActividades();

  }

  consultarActividades(): void {
    this._actividadService.getActividades().subscribe(
      response => this.actividades = response
    );
  }

  dialogRegistrarActividad(): void {
    const dialogRef = this.dialog.open(RegistrarActividadesDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  dialogEditarActividad(id: number): void {
    const dialogRef = this.dialog.open(RegistrarActividadesDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteActividad(id) {
    this._actividadService.deleteActividad(id).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      }
    );
  }

}

@Component({
  selector: 'registrar-actividades-dialog',
  templateUrl: 'registrar-actividades-dialog.html',
})
export class RegistrarActividadesDialog {

  public estado: string;
  public fecha: string;
  public diasRetraso: number;
  public empleadoAsignado: number;
  public estados = [
    {valor: 'Pendiente'},
    {valor: 'Completada'}
  ];
  public empleados: Empleado[] = [];
  public actividad: Actividad;

  constructor(
    public dialogRef: MatDialogRef<RegistrarActividadesDialog>,
    private _empleadoService: EmpleadoService,
    private _actividadService: ActividadService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this._empleadoService.getEmpleados().subscribe(
    response => this.empleados = response
    );
    if (data) {
      this._actividadService.getActividad(data.id).subscribe(
        response => {
          this.actividad = response;
        }
      );
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  registrarActividad() {
    let param = {
      estado: this.estado,
      fecha: this.fecha,
      diasRetraso: this.diasRetraso,
      empleadoAsignado: this.empleados.filter(e => e.id === this.empleadoAsignado)[0]
    };

    this._actividadService.saveActividades(param).subscribe(
      response => { 
        console.log(response);
        this.dialogRef.close();
        window.location.reload();
      }
    );
  }

  editarActividad() {
    let param = this.actividad;

    this._actividadService.updateActividad(param.id, param).subscribe(
      response => {
        console.log(response);
        this.dialogRef.close();
        window.location.reload();
      }
    );
  }

}
