export interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export interface UsersResponse {
  users: User[];
  totalUsers: number;
}

export interface Tutor {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export interface TutorsResponse {
  tutors: Tutor[];
  totalTutors: number;
}

export interface Category {
  _id: string;
  categoryName: string;
  is_listed: boolean;
}

export interface CategoryResponse{
  categories:[],
  totalCategory:number

}
