import { api } from '../adapters/api';


const resource = 'orgs';


export const getOrgs = () => api.get(resource);


export const getOrg = (orgId) => api.get(`${resource}/${orgId}`);


export const selectOrg = (orgId) => api.post(`${resource}/select-org`, { orgId });


export const createOrg = (payload) => {
  const { orgName, phoneNumber } = payload;

  return api.post(resource, { orgName, phoneNumber });
}


export const updateOrg = (orgId, payload) => {
  const { orgName, phoneNumber } = payload;

  return api.patch(`${resource}/${orgId}`, { orgName, phoneNumber });
}

export const deleteOrg = (orgId) =>
  api.delete(`${resource}/${orgId}`);
