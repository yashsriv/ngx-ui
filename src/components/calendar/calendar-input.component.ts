import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { noop } from '../../utils';
import './calendar.scss';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarInputComponent),
  multi: true
};

@Component({
  selector: 'swui-calendar-input',
  providers: [CALENDAR_VALUE_ACCESSOR],
  template: `
    <div class="swui-calendar-input">
      <swui-input
        [ngModel]="viewModel"
        (click)="open()">
      </swui-input>
    </div>
  `
})
export class CalendarInputComponent implements ControlValueAccessor {

  @Output() onSelect = new EventEmitter();

  get value() {
    return this._value;
  }

  set value(val: any) {
    if (!this.compareDates(val, this._value)) {
      // always store as raw
      if(val && val.toDate)
        val = val.toDate();

      this._value = val;
      this.onChangeCallback(this._value);
      this.onSelect.emit(this._value);
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private _value: any;
  private viewModel: any;

  compareDates(newDate, oldDate) {
    const newVal = newDate && newDate.toString ?
      newDate.toString() : newDate;

    const oldVal = oldDate && oldDate.toString ?
      oldDate.toString() : oldDate;

    return newVal === oldVal;
  }

  writeValue(val: any) {
    if (!this.compareDates(val, this._value)) {
      // always store as raw
      if(val && val.toDate)
        val = val.toDate();

      this._value = val;
    }
  }

  open() {

  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
