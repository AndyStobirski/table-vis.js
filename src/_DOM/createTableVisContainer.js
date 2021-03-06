'use strict';
import className from 'className';
import createDrawBtnSet from './createDrawBtnSet'

// the module is to create the fixed table container fluid,
// which is the visulization canvas's container

const createTableVisContainer = (target) => {
  // create the container div;
  let tabularContainerFluid = document.createElement('div');
  className.addClass(tabularContainerFluid,'tabular_container_fluid');

  let tabularContainer = document.createElement('div');
  tabularContainer.setAttribute('id','tabular_vis');

  className.addClass(tabularContainer,'tabular_container');
  tabularContainer.addEventListener('click',() => {

    tabularContainerFluid.removeAttribute('style');
    tabularContainerFluid.style.width = "0";
    tabularContainerFluid.removeChild(tabularContainerFluid.querySelector('h3'))
    tabularContainer.removeChild(tabularContainer.firstElementChild);
    let highlight = document.querySelectorAll('.tabular_highlight');

    highlight.forEach( d => {
      className.removeClass(d,'tabular_highlight')
    })
  })
  // create button components
  tabularContainerFluid.appendChild(createDrawBtnSet(target));

  // append tabular container.
  tabularContainerFluid.appendChild(tabularContainer);
  document.body.appendChild(tabularContainerFluid);
  console.log('Create Tabular div done')
  return tabularContainerFluid;

}

export default createTableVisContainer;
