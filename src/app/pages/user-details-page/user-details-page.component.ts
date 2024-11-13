import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { MatFormField,MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-details-page',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss',
})
export class UserDetailsPageComponent implements OnInit {
  id!: number;
  user!: User | undefined;
  is_new_user!: boolean;
  is_submitted!: boolean
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('ID:', this.id);

      // Create new default user form
      this.userForm = this.fb.group({
        email: new FormControl('', Validators.required),
        first_name: new FormControl('', Validators.required),
        middle_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        date_of_birth: new FormControl<string>(
          this.formatDate(new Date('1999-01-01')),
          Validators.required
        ),
        gender: new FormControl<boolean>(true, Validators.required),
        is_activated: new FormControl<boolean>(false, Validators.required),
        profile_img_url: new FormControl('', Validators.required),
        phone_number: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[-+]?\d+([-\d]*)$/)
        ]),
        main_language: new FormControl('', Validators.required),
        nationality: new FormControl('', Validators.required),
        recitations: new FormControl('', Validators.required),
      });

      // Check if user exists by id, if yes patch the form, otherwise do nothing
      this.checkId();
    });

      // Subscribe to value changes to detect form updates
      this.userForm.valueChanges.subscribe(() => {
      if (!this.userForm.pristine) {
        this.is_submitted = false;  // Enable button if the form is modified
      }
      });

  }

  public checkId() {
    // Check if the user exists in the users array
    this.userManagementService.getUserById(this.id).subscribe(
      (user) => {

        if (user) {
          this.user = user;
          console.log(`User with ID ${this.id} was found.`);
          this.is_new_user = false;
          this.fillForm(user);
        } 
        else {
          this.user = undefined 
          console.log(
            `User with ID ${this.id} was not found. A new user account will be created.`
          );
          this.is_new_user = true;
        }
      },
      (error) => console.error('Error fetching user:', error)
    );
  }

  public fillForm(user: User) {
    const date = new Date(user.date_of_birth);
    //const formattedDate = date.toISOString().split('T')[0];
    const formattedDate = this.formatDate(date);

    this.userForm.patchValue({
      email: user.email,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      date_of_birth: formattedDate,
      gender: user.gender,
      is_activated: user.is_activated,
      profile_img_url: user.profile_img_url,
      phone_number: user.phone_number,
      main_language: user.main_language,
      nationality: user.nationality,
      recitations: user.recitations,
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formats date to yyyy-MM-dd
  }

  public updateUser() {console.log('User is updated')}

  public createNewUser() {console.log('New user is created')}

  submit() {
    this.is_submitted = true;

    if (this.is_new_user) {
      this.createNewUser();
    } else {
      this.updateUser();
    }
  }

  formChange() {console.log('Form changed')}

  // Check if the form is valid or modified
  isSubmitDisabled(): boolean {
    return this.userForm.invalid || (!this.is_new_user && this.userForm.pristine) || this.is_submitted ;
  }
}
