import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../services/notice.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, TooltipModule, ReactiveFormsModule,  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {
  politices:any;
  breaking:any;
  modalRef?: BsModalRef;
  uploadForm!: FormGroup;
  sendItem!:FormGroup;
  id_noticia:any;
  url_img: string = '';
  user:any;
  dataAtual: Date = new Date();







  constructor(private api:ApiService,private noticeService: NoticeService, private modalService: BsModalService, private fb: FormBuilder,
    private toast: ToastrService
   ){


  }
  ngOnInit(): void {
    this.url_img = this.api.url_sistema + "application/imagens/";
    console.log("url das imanges", this.url_img);
      this.noticeService.noticePolicites().subscribe((data:any)=>{
          console.log("noticias politicas", data);
          this.politices = data;
          this.id_noticia = data[0].id_notice;
          this.uploadForm = this.fb.group({
            title_politices: [data[0].title_politices, Validators.required],
            body_politices: [data[0].body_politices, Validators.required],
            imga_name: [data[0].img_politices, Validators.required],
            id_notice:[data[0].id_notice, Validators.required]
  
          });
      })

      this.sendItem = this.fb.group({
        title_politices: [this.uploadForm.value.title_politices, Validators.required],
        body_politices: [this.uploadForm.value.body_politices, Validators.required],
        id_notice: [this.id_noticia, Validators.required],
        img_politices:[this.uploadForm.value.img_name],
        imagem: ['', Validators.required],

  
      });
    this.get_breaking_news();
    
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    console.log("imagem selecionada", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.sendItem.patchValue({ imagem: base64String });

      };
      reader.readAsDataURL(file);
    }
  }


 
  openModal(template: TemplateRef<void>) {
    this.user = localStorage.getItem("user");

    if(this.user){
      this.modalRef = this.modalService.show(template);
    }else{
      this.toast.error("Faça Login" !, "Mensagem" )
    }
  }



  get_breaking_news(){
    this.noticeService.breakingNotices().subscribe((data:any)=>{
      console.log("breaking news", data);

      this.breaking = data;

    })
  }



  async updatePolitices(id:any){
    console.log("form atualiza", this.sendItem.value);
      this.noticeService.updateNoticesPolitices(id, this.sendItem.value).subscribe(async (data:any)=>{
        this.toast.success( data.message ,"Mensagem", );
        this.sendItem.reset();
        setTimeout(() => {
          window.location.reload();
       }, 1000);
      });

  }





}
