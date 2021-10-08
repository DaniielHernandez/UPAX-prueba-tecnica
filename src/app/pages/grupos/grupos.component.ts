import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GruposService } from '../../services/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit, OnDestroy {

  grupos: any = [];
  getSubscription: Subscription | undefined;

  constructor( private gruposService: GruposService) { }

  ngOnInit(): void {
    this.getSubscription = this.gruposService.getGrupos()
      .subscribe( resp => {
          // Se consulto correctamente
          this.grupos = [];
          this.grupos.push( ...resp.data.groups );
        }
      );
  }

  ngOnDestroy() {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }
}
