import { User } from "../models/user";

/**
 * @param {Like<User>} user
 */
export const deleteUser = async( id ) => {
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const res = await fetch(url,{
        method: 'DELETE',
    })

    const deleteRes = await res.json();
    console.log(deleteRes);

    return true;

}