import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Company-ver',
  templateUrl: './Company-ver.component.html',
  styleUrls: ['./Company-ver.component.css']
})
export class CompanyVerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetail } from '../Company-detail';

@Component({
  selector: 'app-Company-ver',
  templateUrl: './Company-ver.component.html',
  styleUrls: ['./Company-ver.component.css']
})
export class CompanyVerComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute) { }

  userId: number | undefined;
  token: string | undefined;
  company!: CompanyDetail;


  viewDetailUserCompany(userId: number){
    this.companyService.viewDetailUserCompany(userId).subscribe(company=>{
      console.info("The company was created: ", company)
      this.toastr.success("Confirmation", `/${userId}`)
      this.company=company
    })
  }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.viewDetailUserCompany(this.userId)
    }

  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

}

