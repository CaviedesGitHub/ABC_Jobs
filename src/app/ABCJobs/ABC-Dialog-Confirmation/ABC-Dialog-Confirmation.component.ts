import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Confirmacion } from 'src/app/Candidate/Confirmacion';

@Component({
  selector: 'app-ABC-Dialog-Confirmation',
  templateUrl: './ABC-Dialog-Confirmation.component.html',
  styleUrls: ['./ABC-Dialog-Confirmation.component.css']
})
export class ABCDialogConfirmationComponent implements OnInit {
  respuesta: string = "SI"
  constructor(@Inject(MAT_DIALOG_DATA) public data: Confirmacion,
               private dialogRef: MatDialogRef<ABCDialogConfirmationComponent>) { }


  si(){
    this.respuesta="SI"
    this.dialogRef.close(this.respuesta)
  }

  no(){
    this.respuesta="NO"
    this.dialogRef.close(this.respuesta)
  }

  ngOnInit() {
  }

}
