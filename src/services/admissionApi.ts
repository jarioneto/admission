import { AxiosResponse } from 'axios';
import { 
  AdmissionListRequest,
  AdmissionListResponse,
  AdmissionCreateRequest,
  AdmissionCreateResponse,
  AdmissionUpdateRequest,
  AdmissionUpdateResponse,
  AdmissionDeleteRequest,
  AdmissionDeleteResponse
} from '~/types/admission';

import http from './http';

export const listAdmissions = async (
  { employeeCPF }: AdmissionListRequest = {}
): Promise<AxiosResponse<AdmissionListResponse>> => {
  let query = '';

  if (employeeCPF) {
    const params = new URLSearchParams({ employeeCPF });
    query = `?${params}`;
  }

  return http.get<AdmissionListResponse>(`/registrations${query}`);
};

export const createAdmission = async (
  data: AdmissionCreateRequest
): Promise<AxiosResponse<AdmissionCreateResponse>> => {
  return http.post<AdmissionCreateResponse>(`/registrations`, data);
};

export const updateAdmission = async (
  { id, ...data }: AdmissionUpdateRequest
): Promise<AxiosResponse<AdmissionUpdateResponse>> => {
  return http.put<AdmissionUpdateResponse>(`/registrations/${id}`, data);
};

export const deleteAdmission = async (
  { id }: AdmissionDeleteRequest
): Promise<AxiosResponse<AdmissionDeleteResponse>> => {
  return http.delete<AdmissionDeleteResponse>(`/registrations/${id}`);
};