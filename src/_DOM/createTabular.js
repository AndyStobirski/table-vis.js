'use strict';
import className from 'className';
import createDrawButton from './createDrawButton'

const createTabular=()=>{
  // create the container div;
  let tabularContainerFluid = document.createElement('div');
  className.addClass(tabularContainerFluid,'tabular_container_fluid');
  let tabularContainer = document.createElement('div');
  tabularContainer.setAttribute('id','tabular_vis');
  className.addClass(tabularContainer,'tabular_container');
  tabularContainer.addEventListener('click',()=>{
    tabularContainerFluid.removeAttribute('style');
    tabularContainerFluid.style.width = "0";
    tabularContainer.removeChild(tabularContainer.firstElementChild);
  })
  // create button components
  tabularContainerFluid.appendChild(createDrawButton());
  // append tabular container.
  tabularContainerFluid.appendChild(tabularContainer);
  document.body.appendChild(tabularContainerFluid);
  console.log('Create Tabular div done')
  return tabularContainerFluid;

}

export default createTabular;