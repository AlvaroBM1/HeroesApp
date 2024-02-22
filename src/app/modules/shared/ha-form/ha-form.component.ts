import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs";


@Component({
  selector: 'ha-form',
  templateUrl: 'ha-form.component.html',
  styleUrls: ['ha-form.component.scss']
})

export class HaFormComponent implements OnInit {

  @Output() formChanged = new EventEmitter<string>();

  public searchForm!: FormGroup;

  ngOnInit(): void {
    this.onFormChange()
  }

  private onFormChange() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
    });
    this.searchForm.get('name')?.valueChanges
    .pipe(debounceTime(500))
    .subscribe((name: string) => {
      this.formChanged.emit(name);
    });
  }

}

