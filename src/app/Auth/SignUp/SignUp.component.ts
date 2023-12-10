import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { User } from '../User';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router){}

    createUser(user: User){
      this.authService.createUser(user).subscribe(user=>{
        console.info("The user was created: ", user)
        this.toastr.success("Confirmation", "User created")
        this.signupForm.reset();
        this.router.navigate(['/login'])  
      })
    }
  
    cancelCreation(){
      this.signupForm.reset();
    }
  
    ngOnInit() {
      this.signupForm = this.formBuilder.group({
        nombre: ["", Validators.required],
        password: ["", Validators.required],
        password2: ["", Validators.required],
        tipo: ["Select your ROLE", Validators.required]
      })
    }

}
