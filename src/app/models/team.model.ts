// team.model.ts
export interface Team {
  id: number;
  title: string;
  format: string;
  graduatedFirstSemester: boolean;
  supervisor: {
    id: number;
    name: string;
    phoneNumber: string;
    specialization: string;
    email: string;
  };
  leader: {
isLeader: any;
    id: number;
    name: string;
    universityNumber: string;
    phoneNumber: string;
    specialization: string;
    email: string;
  };
  students: {
    id: number;
    name: string;
    universityNumber: string;
    phoneNumber: string;
    specialization: string;
    email: string;
    isLeader: boolean;
  }[];
}
