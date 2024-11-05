export interface User {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    status: boolean; // active or not
    date_of_birth: string;
    is_activated: boolean;
    profile_img_url: string;
    phone_number: string;
    gender: boolean; // male/true or female/false
    main_language: string; 
    nationality: string; 
    recitations: string;
}
