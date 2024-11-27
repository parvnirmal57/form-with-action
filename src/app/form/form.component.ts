import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  editing = false;
  title = 'Create Form';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      id: new FormControl('0'),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(''),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(\/[\w\-]*)*\/?$/),
      ]),
      image: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); //fetch id from route parameters

    if(id){
      this.editing = true;
      this.title = `Edit Form -ID: ${id}`; //update title
      this.loadFormData(Number(id)); //Load the exiting data for id
    }
    }

    loadFormData(id: number){
      const existingData = JSON.parse(localStorage.getItem('Response') || '[]');
      const data = existingData.find((item: any ) => item.id === id);

      if(data){
        this.form.patchValue(data);
      }
      else {
        alert('No record found for this ID');
        this.router.navigate(['/response'])
      }
    }

  onImageChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.form.get('image')?.setErrors(null); // Correct syntax
  
      // Check file type
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        this.form.get('image')?.setErrors({ fileType: true });
        return;
      }
  
      // Check file size (<2MB)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.form.get('image')?.setErrors({ fileSize: true });
        return;
      }
    }
  }
  

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }


    let formData = { ...this.form.value };

    if (this.editing) {
      // Update the edited record
      const existingData = JSON.parse(localStorage.getItem('Response') || '[]');
      const index = existingData.findIndex((item: any) => item.id === formData.id);
      if (index !== -1) {
        existingData[index] = formData;
        localStorage.setItem('Response', JSON.stringify(existingData));
      }
    } else {
      // Add new record
      let currentId = Number(localStorage.getItem('formIdCounter') || '0') + 1;
  
      localStorage.setItem('formIdCounter', currentId.toString());
      formData.id = currentId;

      const existingData = JSON.parse(localStorage.getItem('Response') || '[]');
      existingData.push(formData);
      localStorage.setItem('Response', JSON.stringify(existingData));
    }

    this.router.navigate(['/response']); // Navigate to the response component
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
