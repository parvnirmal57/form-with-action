import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent  implements OnInit{
  editForm: FormGroup;
  submitted = false;
  id: number | null = null;
  title: string = '';

  constructor(private route: ActivatedRoute, private router: Router){
    this.editForm = new FormGroup({
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
    })

  }

  ngOnInit(): void {
    //Fetch id
    this.route.params.subscribe((params)=> {
      this.id = +params['id'];
      this.loadFormData();
    });
  }

  loadFormData(){
    const data =JSON.parse(localStorage.getItem('Response') || '[]');
    const record =data.find((item: any)=> item.id === this.id);

    if(record) {
      this.editForm.patchValue(record);
      this.title = `Editing Record: ${record.firstName} ${record.lastName}`;
    } else {
      alert(`Record not found!`);
      this.router.navigate(['/response']);
    }
  }

  onImageChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.editForm.get('image')?.setErrors(null); // Correct syntax
  
      // Check file type
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        this.editForm.get('image')?.setErrors({ fileType: true });
        return;
      }
  
      // Check file size (<2MB)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.editForm.get('image')?.setErrors({ fileSize: true });
        return;
      }
    }
  }
  

  onSubmit(){
    this.submitted = true;
    if(this.editForm.invalid){
      return;
    }

    const updatedData = this.editForm.value;
    const existingData = JSON.parse(localStorage.getItem('Response')|| '[]');

    //update record by id
    const index = existingData.findIndex((item: any) => item.id === this.id);
    if(index !== -1){
      existingData[index] = updatedData;
      localStorage.setItem('Response', JSON.stringify(existingData));

    }

    alert('Record updated succesfully!');
    this.router.navigate(['/response']);

  }

  onCancel(){
    this.router.navigate(['/response']);
  }


}
