import { Component, OnInit, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { MatFormField,MatLabel, MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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


  users: User[] = [];
  private url_to_db = './assets/db/users.json';
  userForm!: FormGroup;
  id!: number | null ;


  constructor (private route: ActivatedRoute, private http: HttpClient) {};

  ngOnInit(): void {
    this.loadUsers();

    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      console.log('ID:', this.id);
      this.checkId();
    });

    this.userForm = new FormGroup({
      id: new FormControl(0),
      first_name: new FormControl('', Validators.required),
      middle_name: new FormControl(''),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      date_of_birth: new FormControl(''),
      is_activated: new FormControl(false),
      profile_img_url: new FormControl(''),
      phone_number: new FormControl('', Validators.pattern(/^\d+$/)),
      gender: new FormControl(true),
      main_language: new FormControl(''),
      nationality: new FormControl(''),
      recitations: new FormControl(''),
    });


  }

  private checkId() {
      // Check if the user exists in the users array
      const user = this.users.find(user => user.id === this.id);
      
      if (user) {
        // patch the form with the user's data
        //this.patchForm(user);
      } else {
        // Handle case for creating a new user
        this.initializeForm();
      }
  };

//   // Method to populate the form with user data
//   private patchForm(user: User): void {
//     this.userForm.patchValue({
//     first_name: user.first_name,
//     middle_name: user.middle_name,
//     last_name: user.last_name,
//     email: user.email,
//     date_of_birth: user.date_of_birth,
//     is_activated: user.is_activated, 
//     profile_img_url: user.profile_img_url,
//     phone_number: user.phone_number,
//     gender: user.gender, 
//     main_language: user.main_language,
//     nationality: user.nationality,
//     recitations: user.recitations,
//   });
// }

// Method to initialize a blank form
private initializeForm(): void {

}
  private loadUsers() { // Fetch data from the JSON file
    this.http.get<User[]>(this.url_to_db ).subscribe(
      data => {
        this.users = data;
      },
    );
  }

}
