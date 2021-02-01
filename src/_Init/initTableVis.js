'use strict'
// this file is used to initial the table_vis.
// import style files
import './table_vis_style.css'
import className from 'className'
// init Click Btn
import insertCss from '../_DOM/insertCss'
import createTableVisContainer from '../_DOM/createTableVisContainer'

import initBtn from './initBtn'
import colTitle from './initColTitle'
import rowTitle from './initRowTitle'
import initRowDragger from './initRowDragger'
import initColDragger from './InitColDragger'

const tableElement = '[object HTMLTableElement]'

/**Begin here */
const initTableVis = function(table){
    if(Object.prototype.toString.call(table)==tableElement){

          let tBody = table.getElementsByTagName('tbody')[0];

          //利用Js的引用类型是浅拷贝的特点
          let target = new Object();
          let tabular_container_fluid;
          // init the canvas element and the title datas.
          if(!this.initial){
            Object.assign(target
              ,{ 
                data:{}
                , rowTitle:rowTitle(table)
                , colTitle:colTitle(table) 
                , tableChanged: false
              });

            // create the table_vis containers div elements
            insertCss();

            tabular_container_fluid = createTableVisContainer(target);
            // insert the css style sheet of the table_vis.
            // the initial val is to ensure only one table_vis container are created when the web pages have more than one table
            this.initial = true;
          }
          else
            tabular_container_fluid = document.querySelector('.tabular_container_fluid');

            let btnContainer = initBtn(target,tabular_container_fluid);

            initRowDragger(table, btnContainer, target, tabular_container_fluid);
            initColDragger(table, btnContainer, target, tabular_container_fluid);

            //change the cursor style. 改变样式 {cursor:pointer}
            className.addClass(tBody,'tab_vis_tbody');

            tBody.addEventListener('mousedown',
            (event)=>{
              btnContainer.style.display = 'none';
            });

            //event delegation ,td -> tbody
            tBody.addEventListener('mouseup',
            (event)=>{

              let e = event || window.event;

              if (e.target.parentNode.firstElementChild == e.target)
                return;

              // let target =e.target;
              let left = e.clientX;
              let top = e.clientY;

              btnContainer.style.left = left+'px';
              btnContainer.style.top = top+'px';

              btnContainer.style.display = 'block';

              target.ele=e.target

              //recalculate the row and column titles on click
              //this takes into account the fact that rows and columns
              //can be reorderd
              if(target.tableChanged){

                target.rowTitle = rowTitle(table);
                target.colTitle = colTitle(table); 
                target.tableChanged = false; //set in InitColDragger/InitRowDragger

              }
              
            })
    }
    else
      console.error("Please ensure the table element is use")
}

export default initTableVis;
