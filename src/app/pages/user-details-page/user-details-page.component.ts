import { Component, OnInit, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { MatFormField,MatLabel, MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { UserRetrieveService } from '../../services/user-retrieve.service';

@Component({
  selector: 'app-user-details-page',
  standalone: true,
  imports: [MatLabel,
            MatFormField, 
            ReactiveFormsModule,
            MatInputModule,
            MatSelectModule,
            MatFormFieldModule,
            ],

  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss'
})
export class UserDetailsPageComponent implements OnInit {
  id!: number;
  user!: User | undefined;

  email = new FormControl(' ',[Validators.required, Validators.email]);
  first_name= new FormControl('', Validators.required);
  middle_name= new FormControl('');
  last_name= new FormControl('', Validators.required);
  date_of_birth= new FormControl('');
  is_activated= new FormControl(false);
  profile_img_url= new FormControl('');
  phone_number= new FormControl('', Validators.pattern(/^\d+$/));
  main_language= new FormControl('');
  nationality= new FormControl('');
  recitations= new FormControl('');

  constructor (private route: ActivatedRoute, private http: HttpClient, private userRetrieveService: UserRetrieveService) {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      this.checkId();
      console.log('ID:', this.id);
    })
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      console.log('ID:', this.id);
    })
    this.checkId();
  }

  private checkId() {
      // Check if the user exists in the users array
      this.userRetrieveService.getUserById(this.id).subscribe(
        user => {if(user){ this.user = user;}
                  else { this.user = undefined}          
      },
        error => console.error('Error fetching user:', error)
      );
     
      if (this.user) {
        this.email.setValue(this.user.email);
        this.first_name.setValue(this.user.first_name);
        this.middle_name.setValue(this.user.middle_name);
        this.last_name.setValue(this.user.last_name);
        this.date_of_birth.setValue(this.user.date_of_birth);
        this.is_activated.setValue(this.user.is_activated);
        this.profile_img_url.setValue(this.user.profile_img_url);
        this.phone_number.setValue(this.user.phone_number);
        this.main_language.setValue(this.user.main_language);
        this.nationality.setValue(this.user.nationality);
        this.recitations.setValue(this.user.recitations); 
      } 
      else {
        // Handle case for creating a new user
        console.log("new user case")
      }
  };
}
