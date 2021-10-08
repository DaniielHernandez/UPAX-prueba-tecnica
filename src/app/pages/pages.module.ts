import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
import { InicioComponent } from './inicio/inicio.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { GruposComponent } from './grupos/grupos.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { EmpleadoAgregarComponent } from './empleado-agregar/empleado-agregar.component';


@NgModule({
  declarations: [
    InicioComponent,
    EmpleadosComponent,
    GruposComponent,
    EmpleadoAgregarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    IvyCarouselModule
  ],
  entryComponents: [
    EmpleadoAgregarComponent
  ]
})
export class PagesModule { }
