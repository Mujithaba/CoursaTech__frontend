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

  export interface TutorsResponse{
    tutors:Tutor[];
    totalTutors:number;
  }