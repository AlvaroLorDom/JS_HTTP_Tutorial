import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users";


const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    if (state.currentPage === 1 ) return;
    const users = await loadUsersByPage(state.currentPage - 1);
    
    state.currentPage -= 1;
    state.users = users;
}

/**
 * 
 * @param {User} user 
 */
const onUserChange = (user) => {
    let found = false;
    state.users = state.users.map( u => {
        if (u.id === user.id) {
            found = true;
            return user;  
        } 
        return u;
    });

    if (!found && state.users.length < 10 ){
        state.users.push(updateUser);
    }
}

const reloadPage = async() => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0 && state.currentPage != 1) {
        await loadPreviousPage();
        return
    }

    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChange,
    reloadPage,
    /**
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,

}