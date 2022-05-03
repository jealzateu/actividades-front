export class Actividad {
    id: number;
    estado: string;
    fecha: string;
    diasRetraso: number;
    empleadoAsignado: Empleado;
}

export class Empleado {
    id: number;
    nombre: string;
}
