export interface StudentUser {
    id?: number;
    student_profile_id?: number;
    email?: string;
    password?: string;
    verification_token?: string;
    is_verified?: boolean;
}
