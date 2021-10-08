import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoAgregarComponent } from '../empleado-agregar/empleado-agregar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Empleado>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  empleados: Empleado[] = [];
  displayedColumns: string[] = ['id', 'name', 'last_name', 'birthday'];
  getSubscription: Subscription | undefined;
  dialogAddSubscription: Subscription | undefined;

  constructor( public dialog: MatDialog, private empleadosService: EmpleadosService ) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarEmpleados() {
    this.getSubscription = this.empleadosService.getEmpleados()
      .subscribe( resp => {
          // Se consulto correctamente
          this.empleados = [];
          this.empleados.push( ...resp.data.employees );
          
          this.dataSource = new MatTableDataSource( this.empleados);
          this.dataSource.paginator = this.paginator
        }
      );
  }

  modalAgregarEmpleado() {
    const dialogAdd = this.dialog.open(EmpleadoAgregarComponent);
    this.dialogAddSubscription = dialogAdd.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.cargarEmpleados();
      }
    });
  }

  ngOnDestroy() {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.dialogAddSubscription) {
      this.dialogAddSubscription.unsubscribe();
    }
  }

}
