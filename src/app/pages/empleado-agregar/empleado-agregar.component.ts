import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-agregar',
  templateUrl: './empleado-agregar.component.html',
  styleUrls: ['./empleado-agregar.component.css']
})
export class EmpleadoAgregarComponent implements OnInit, OnDestroy {

  empleadoForm!: FormGroup;
  postSubscription: Subscription | undefined;
  constructor(
    public dialogRef: MatDialogRef<EmpleadoAgregarComponent>,
    public empleadosService: EmpleadosService
  ) {
  }

  ngOnInit(): void {
    this.empleadoForm = this.createFormGroupEmpleado();
  }

  agregar() {
    this.empleadoForm.value.birthday = this.empleadoForm.value.birthday.replace(/-/g, '/');
    this.postSubscription = this.empleadosService.postPersona(this.empleadoForm.value)
      .subscribe((resp)=>{
        // Se agrego correctamente
        this.dialogRef.close(true);
      },
      (err:Error)=>{
        // Error de la peticion POST
        this.dialogRef.close(false);
      }
    );
  }

  createFormGroupEmpleado() {
    return new FormGroup({
      name: new FormControl('',
        [Validators.required,Validators.maxLength(30),Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]
      ),
      last_name: new FormControl('',
        [Validators.required,Validators.maxLength(30),Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]
      ),
      birthday: new FormControl('',
        [Validators.required]
      )
    });
  }

  formValidators(field:string,lengthField:number) {
    if (this.empleadoForm.controls[field].hasError('required')) {
      return 'El campo es necesario';
    } else if (this.empleadoForm.controls[field].hasError('pattern')) {
      return 'El campo solo debe tener letras';
    } else if (!this.empleadoForm.controls[field].hasError('maxLength')) {
      return 'El campo debe tener maximo '+lengthField+' caracteres';
    } else {
      return 'Error '+field;
    }
  }

  getErrorMessage(data:string) {
    let response: string;
    switch (data) {
      case 'name':{
        response=this.formValidators('name',30);
        break;
      }
      case 'last_name':{
        response=this.formValidators('last_name',30);
        break;
      }
      case 'birthday':{
        if (this.empleadoForm.controls['birthday'].hasError('required')) {
          response='El campo es necesario';
        } else {
          response='Debe tener el siguiente formato YYYY/MM/DD';
        }
        break;
      }
      default:{
        response='';
        break;
      }
    }
    return response;
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
