import { localhostUserToModel } from "../mappers/localhost-user";
import { userModelToLocalhost } from "../mappers/user-to-localhost";
import { User } from "../models/user"
/**
 * @param {Like<User>} u 
 */
export const saveUser = async( u ) => {
    const user = new User(u);
    if ( !user.firstName || !user.lastName )
        throw new Error('Firstname and lastname required')    

    const userToSave = userModelToLocalhost(user)
    
    if (user.id) {
        return localhostUserToModel(await updateUser(userToSave));
    }
    return localhostUserToModel(await createUser(userToSave));
}

/**
 * @param {Like<User>} user
 */
const createUser = async( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await res.json();
}

/**
 * @param {Like<User>} user
 */
const updateUser = async( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
    const res = await fetch(url,{
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await res.json();
}