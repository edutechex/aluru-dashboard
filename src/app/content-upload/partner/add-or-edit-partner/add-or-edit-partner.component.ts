import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addPartner, editPartner } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-partner',
  templateUrl: './add-or-edit-partner.component.html',
  styleUrls: ['./add-or-edit-partner.component.css']
})
export class AddOrEditPartnerComponent implements OnInit{
  addEditPartnerItemForm: any = FormGroup;
  success: boolean = false;
  err: boolean = false;
  url:any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb: FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditPartnerItemForm = this.fb.group({
      title : new FormControl('',[Validators.required]),
      link : new FormControl('',[Validators.required]),
      imageFile : '',
    })
  }

  ngOnInit(): void {
    this.addEditPartnerItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditPartnerItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditPartnerItem(){
    if(this.addEditPartnerItemForm.valid){
      if(this.datas){
        const editPartnerData : editPartner = {
          id : this.datas.id,
          title : this.addEditPartnerItemForm.controls['title'].value,
          link : this.addEditPartnerItemForm.controls['link'].value,
          imageFile : this.addEditPartnerItemForm.controls['imageFile'].value
        }
        this.editPartnerForm(editPartnerData)
      }else{
        const addPartnerData : addPartner = {
          title : this.addEditPartnerItemForm.controls['title'].value,
          link : this.addEditPartnerItemForm.controls['link'].value,
          imageFile : this.addEditPartnerItemForm.controls['imageFile'].value
        }
        this.addPartnerForm(addPartnerData)
      }
    }
  }

  addPartnerForm(data: any){
    const formData :any = new FormData;
    formData.append('imageFile',this.file);
    formData.append('title',this.addEditPartnerItemForm.get('title').value);
    formData.append('link',this.addEditPartnerItemForm.get('link').value);

    this.appService.addPartner(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
         this.successMsgDialog('Item Added Successfylly');
       },
       error:(err)=>{
         this.success = false;
         this.err = true;
         this.successMsgDialog(err.message);
       }
    })
  }

  editPartnerForm(data: any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('title',this.addEditPartnerItemForm.get('title').value);
    formData.append('link',this.addEditPartnerItemForm.get('link').value);

    this.appService.updatepartner(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Updated Successfully');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 750;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
        // this.appService.openSection('navItem');
      }, timeout);
    });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
