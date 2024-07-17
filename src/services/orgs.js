import { api } from '../adapters/api';


const resource = 'orgs';


export const getOrgs = () => api.get(resource);
