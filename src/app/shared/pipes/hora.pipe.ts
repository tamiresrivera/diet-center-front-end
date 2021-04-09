import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(data: string, args?: any): string {
    return moment(data).format('HH:mm:ss');
  }

}
