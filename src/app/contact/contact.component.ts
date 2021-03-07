import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ContactService } from '../service/index';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService:ContactService
    ) { }

  get f() { return this.contactForm.controls; }
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.required],
      message: ['', Validators.required]
  });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
        return;
    }

    this.loading = true;
    this.contactService.contact(this.contactForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/contact']);
                this.loading = false;
                this.formBuilder.control('email').value('');
                this.formBuilder.control('message').value('');
            },
            error => {
                this.loading = false;
            });
}

}
