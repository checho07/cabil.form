import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
@Directive({
  selector: '[appExcelreader]',
  exportAs: 'readexcel'
})
export class ExcelreaderDirective {

excelObservable: Observable<any>;
@Output() eventEmitter = new EventEmitter();

  constructor(private el: ElementRef) { }

  @HostListener('change', ["$event.target"])

  onChange(target){

    const file = target.target.files[0];
    this.excelObservable = new Observable((subscriber:Subscriber<any>) => {
      subscriber.next('s');
      this.readFile(file, subscriber)
    });

    this.excelObservable.subscribe((d) => {
      this.eventEmitter.emit(d);
    })

  }

  readFile(file:File, subscriber:Subscriber<any>){

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bufferArray,{type: 'buffer'});

      const wsname:string =  wb.SheetNames[0];

      const ws:XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      subscriber.next(data);

      subscriber.complete();

    }
  }

}
