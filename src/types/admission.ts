export enum AdmissionStatus {
  Approved = 'APPROVED',
  Review = 'REVIEW',
  Reproved = 'REPROVED'
};

export interface Admission {
  id: string;
  cpf: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: keyof typeof AdmissionStatus;
}

export interface AdmissionListRequest {
  cpf?: string;
}

export type AdmissionListResponse = Array<Admission>;

export type AdmissionCreateRequest = Omit<Admission, 'id'>;
export type AdmissionCreateResponse = Admission;

export type AdmissionUpdateRequest = Admission;
export type AdmissionUpdateResponse = Admission;

export type AdmissionDeleteRequest = {
  id: string;
};

export type AdmissionDeleteResponse = Admission;



