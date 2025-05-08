import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  modalRef?: BsModalRef;
  uploadForm!: FormGroup;
  sendItem!: FormGroup;
  user:any;
  email: any = 'adm@gmail.com'


  constructor( private modalService: BsModalService, private fb: FormBuilder,private userService: UserService, private toast: ToastrService,
    private router: Router, private spinner: NgxSpinnerService
  ){
    this.uploadForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
    



  }

  ngOnInit(){

    this.userLogado();

  }


  userLogado(){
    this.user = localStorage.getItem("user");
    console.log("usuario logado", this.user);
  }

    openModal(template: TemplateRef<void>) {
      this.modalRef = this.modalService.show(template);
    }

    

    logar(){
      console.log("login", this.uploadForm.value);
      this.userService.login_user(this.uploadForm.value).subscribe((data:any)=>{
        this.spinner.show();
        

        if(data.status == true){
          this.toast.success( data.message ,"Mensagem", );
          this.uploadForm.reset();
          localStorage.setItem("user", data[0].email);
          setTimeout(() => {
           window.location.reload();
        }, 1000);
        }else{
          this.toast.error("Email/Senha errados !", "Mensagem");
        }

      })
    }

    sair(){
      localStorage.removeItem("user");
      window.location.reload();

    }

}
