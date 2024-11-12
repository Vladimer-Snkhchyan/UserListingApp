import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { MatFormField,MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserManagementService } from '../../services/user-management.service';

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
  is_new_user!: boolean;

  email = new FormControl('', Validators.required );
  first_name= new FormControl('', Validators.required);
  middle_name= new FormControl('', Validators.required);
  last_name= new FormControl('', Validators.required);
  date_of_birth = new FormControl<string>(new Date('1999-01-01').toISOString().split('T')[0], Validators.required);
  gender = new FormControl<boolean>(true, Validators.required);
  is_activated= new FormControl<boolean>(false, Validators.required);
  profile_img_url= new FormControl('', Validators.required);
  phone_number= new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]);
  main_language= new FormControl('', Validators.required);
  nationality= new FormControl('', Validators.required);
  recitations= new FormControl('', Validators.required);

  constructor (private route: ActivatedRoute, private userManagementService: UserManagementService) {  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log('ID:', this.id);
      this.checkId();
    })
  
  }

  public checkId() {
    // Check if the user exists in the users array
    this.userManagementService.getUserById(this.id).subscribe(
      user => {
        if (user) {
          this.user = user;
          console.log(`User with ID ${this.id} was found.`);
          this.is_new_user = false;
          this.fillForm(user)

        } 
        else {
          this.user = undefined;
          console.log(`User with ID ${this.id} was not found. A new user account will be created.`);
          this.is_new_user = true;

        }
      },
      error => console.error('Error fetching user:', error)
    );
  }

  public fillForm(user: User){
    this.email.patchValue(user.email);
    this.first_name.patchValue(user.first_name);
    this.middle_name.patchValue(user.middle_name);
    this.last_name.patchValue(user.last_name);
    const date = new Date(user.date_of_birth);
    const formattedDate = date.toISOString().split('T')[0]

    this.gender.patchValue(user.gender)
    this.date_of_birth.patchValue(formattedDate);
    this.is_activated.patchValue(user.is_activated);
    this.profile_img_url.patchValue(user.profile_img_url);
    this.phone_number.patchValue(user.phone_number);
    this.main_language.patchValue(user.main_language);
    this.nationality.patchValue(user.nationality);
    this.recitations.patchValue(user.recitations); 
  }

  public updateUser() {

  }

  public createNewUser() {

  }

  submit () {
    if(this.is_new_user){
      this.createNewUser();
    }
    else {
      this.updateUser();
    }
  } 
}
