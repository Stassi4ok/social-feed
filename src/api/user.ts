import { User } from '../types/user';
import { api } from './client';
import { ENDPOINTS } from './endpoints';


export const getUserById = async (id: number) => {
    const {data} = await api.get<User>(`${ENDPOINTS.USERS}/${id}`);
    return data;
}