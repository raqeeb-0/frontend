import { api } from '../adapters/api';


const resource = 'users';


export const getUser = () => api.get(resource).then((data) => data.json());
