import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit{
  Response: any[]=[];

  constructor(private router: Router){}

  ngOnInit() {this.loadResponses();
  }

  //load resposne
  loadResponses(){
    const data = localStorage.getItem('Response');
    this.Response = data ? JSON.parse(data): [];
  }

  //edit response
  onEdit(submission:any){
    localStorage.setItem('editResponse', JSON.stringify(submission));
    this.router.navigate(['/edit']);
  }

  //delete response
  onDelete(id: number){
    if (confirm('Are you sure you want to delete this record?')){
      this.Response = this.Response.filter((item)=> item.id !==id);
      localStorage.setItem('Response', JSON.stringify(this.Response));
      this.loadResponses();
    }
  }

  
}
