import { api } from '../adapters/api';


const resource = 'orgs';


export const getOrgs = () => api.get(resource).then((data) => data.json());
