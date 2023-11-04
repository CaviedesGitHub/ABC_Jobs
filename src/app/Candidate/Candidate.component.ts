import { Component, OnInit } from '@angular/core';
import { CandidateService } from './Candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { CandidateDetail } from './Candidate-detail';

@Component({
  selector: 'app-Candidate',
  templateUrl: './Candidate.component.html',
  styleUrls: ['./Candidate.component.css']
})
export class CandidateComponent implements OnInit {
  //private toastr: ToastrService,
  constructor(private candidateService: CandidateService, 
              private router: ActivatedRoute) { }

  userId: number | undefined;
  token: string | undefined;
  candidate!: CandidateDetail;
  
  viewDetailUserCandidate(userId: number){
    this.candidateService.viewDetailUserCandidate(userId).subscribe(cand=>{
      console.info("The candidate was created: ", cand.nombres)
      //this.toastr.success("Confirmation", `/${userId}`+cand.nombres)
      this.candidate=cand
    })
  }
  
  ngOnInit() {
    //if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
    //  this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    //}
    //else {
      this.userId = 1 //parseInt(this.router.snapshot.params.userId)
      this.token = "" //this.router.snapshot.params.userToken
      this.viewDetailUserCandidate(this.userId)
    //}
  
  }
  
  showError(error: string) {
    //this.toastr.error(error, "Error de autenticación")
  }
  
  showWarning(warning: string) {
    //this.toastr.warning(warning, "Error de autenticación")
  }
  

}
