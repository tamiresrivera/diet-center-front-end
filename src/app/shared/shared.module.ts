import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { DataPipe } from './pipes/data.pipe';
import { HoraPipe } from './pipes/hora.pipe';



@NgModule({
  declarations: [MascaraDirective, DataPipe, HoraPipe],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective,
    DataPipe
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
