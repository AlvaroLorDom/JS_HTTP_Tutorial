import usersStore from "../../store/users-store";
import './render-buttons.css';
import { renderTable } from "../render-table/render-table";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {
    const nextButton = document.createElement('button');
    nextButton.innerText = ' Next >';
    
    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev ';

    const currentLabel = document.createElement('span');
    currentLabel.id = 'current-page';
    currentLabel.innerText = usersStore.getCurrentPage();
    
    element.append(prevButton, currentLabel, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });
}