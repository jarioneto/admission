export enum AdmissionStatus {
  Approved = 'APPROVED',
  Review = 'REVIEW',
  Reproved = 'REPROVED'
};

export interface Admission {
  id: string;
  date: string;
  employeeCPF: string;
  employeeEmail: string;
  employeeName: string;
  status: AdmissionStatus;
}

export type AdmissionFormValues = Omit<Admission, 'id' | 'status'>;

export type AdmissionDashboard = Record<AdmissionStatus, Array<Admission>>;

export interface AdmissionListRequest {
  employeeCPF?: string;
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



