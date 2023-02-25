import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactForm = new FormGroup({
    name : new FormControl("",Validators.required),
    email : new FormControl("",Validators.required),
    subject : new FormControl("",Validators.required),
    message : new FormControl("",Validators.required)
  })

  constructor(){}

  ngOnInit(){}


  submitData(contactData:any){
    if(this.contactForm.valid){
      console.log(contactData)
     // call service 
    }
  }
}
