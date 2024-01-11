import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-ABC-Dialog-Input-Num',
  templateUrl: './ABC-Dialog-Input-Num.component.html',
  styleUrls: ['./ABC-Dialog-Input-Num.component.css']
})
export class ABCDialogInputNumComponent implements OnInit {
  testForm!: FormGroup;
  valor: number=0;
  valor_min: number=0;
  valor_max: number=100;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.valor=0;
    this.valor_min= 0;
    this.valor_max= 100;

    this.testForm = this.formBuilder.group({
      nota: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    })
  }

}
