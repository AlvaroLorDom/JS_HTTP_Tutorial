import usersStore from '../../store/users-store';
import { deleteUser } from '../../use-cases/delete-user';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody );
    return table;
}

const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if ( element ) {
        const id = element.getAttribute('data-id');
        showModal(id);
    }
}

const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user');
    if ( element ) {
        const id = element.getAttribute('data-id');
        try {
            await deleteUser(id);
            await usersStore.reloadPage();
            document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
            renderTable();

        }catch (error) {
            console.log(error);
            alert('Could not delete');
        }
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {
    
    if ( !table ) {
        table = createTable();
        element.append( table );
        
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }
    
    let tableHTML = '';
    const users = usersStore.getUsers();
    users.forEach(user => {
        tableHTML += `
        <tr>
            <td>${ user.id }</td>
            <td>${ user.balance }</td>
            <td>${ user.firstName }</td>
            <td>${ user.lastName }</td>
            <td>${ user.isActive }</td>
            <td>
                <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
            </td>
        </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;



}