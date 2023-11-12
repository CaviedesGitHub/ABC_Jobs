import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebaMaterialComponent } from './PruebaMaterial.component';

import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [PruebaMaterialComponent],
  exports: [PruebaMaterialComponent]
})
export class PruebaMaterialModule { 
}

