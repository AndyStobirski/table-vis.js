'use strict';

import className from 'className';
import swapTableVis from 'swapTableVis'
import colData from 'colData'
import rowData from 'rowData'
import bar from 'bar'
import initHead from './initHead'
import tableVisibility from '../_DOM/tableVisibility'

/**
 * Build and insert the action button which is use to start data examination for row
 * and column upon an appropriate click.
 * 
 * @param {*} target Data object 
 * @param {*} tcf 
 */
const initBtn = (target,tcf) => {

  //#region Build menu

  let btnContainer = document.createElement('div');
  let btnBox = document.createElement('div');
  // add style of btn
  className.addClass(btnContainer,'tab_vis_btn_container')
  className.addClass(btnBox,'tab_vis_btn')

  var row, cell, icon;
  
  //ROW functions
    row = document.createElement('div');
    className.addClass(row,'tab_vis_btn_Row');
    btnBox.appendChild(row);
    cell = document.createElement('div');
    className.addClass(cell,'tab_vis_btn_Cell');
    cell.innerHTML= 'ROW';
    row.appendChild(cell);

    let hideRow = document.createElement('div');
    row.appendChild(hideRow);
    className.addClass(hideRow,'tab_vis_btn_Cell tab_vis_btn_Cell_Pointer');//      
    icon = document.createElement('i');
    className.addClass(icon,'fa fa-eye-slash');//
    hideRow.appendChild(icon);
    
    let rowBtn = document.createElement('div');
    row.appendChild(rowBtn);
    className.addClass(rowBtn,'tab_vis_btn_Cell tab_vis_btn_Cell_Pointer');//        
    icon = document.createElement('i');
    className.addClass(icon,'fa fa-search');
    rowBtn.appendChild(icon);
    


  //COL functions
    row = document.createElement('div');
    className.addClass(row,'tab_vis_btn_Row');
    btnBox.appendChild(row);  
    cell = document.createElement('div');  
    className.addClass(cell,'tab_vis_btn_Cell');
    cell.innerHTML = 'COL';
    row.appendChild(cell);
    
    let hideCol = document.createElement('div');
    row.appendChild(hideCol);
    className.addClass(hideCol,'tab_vis_btn_Cell tab_vis_btn_Cell_Pointer');//      
    icon = document.createElement('i');
    className.addClass(icon,'fa fa-eye-slash');//
    hideCol.appendChild(icon);
    
    let columnBtn = document.createElement('div');
    row.appendChild(columnBtn);
    className.addClass(columnBtn,'tab_vis_btn_Cell tab_vis_btn_Cell_Pointer');//        
    icon = document.createElement('i');
    className.addClass(icon,'fa fa-search');
    columnBtn.appendChild(icon);
        
  // append row and column button;
  btnContainer.appendChild(btnBox);

  // append button container
  document.body.appendChild(btnContainer);

  //#endregion Build menu

  hideCol.addEventListener('click',
  ()=>{
      let colIndex = rowData(target.ele,target.rowTitle,0).index;
      tableVisibility.HideColumn( target.entireTable,  colIndex + 1);
      btnContainer.style.display = 'none';
  });

  hideRow.addEventListener('click',
  ()=>{
      let rowIndex = colData(target.ele,target.colTitle,0).index;
      tableVisibility.HideRow( target.entireTable,  rowIndex + 1);
      btnContainer.style.display = 'none';
  });

  let click = false;

  // row button event
  rowBtn.addEventListener('click',
    ()=>{
      document.querySelectorAll('.tabular_highlight').forEach(function(d){
        className.removeClass(d,'tabular_highlight');
      })
      btnContainer.style.display='none';
      let row = rowData
        (
          target.ele
          ,target.rowTitle
          ,1
        );

      let headInx = colData(target.ele,target.colTitle,0).index;

      Object.assign(target.data,{
        data:row.data,
        title:row.title,
        index:row.index,
        oriData:row.oriData,
        head:target.colTitle[headInx],
        status:'row'});
    if('titleIdx' in row)
        Object.assign(target.data,{titleIdx:row.titleIdx});
    else
       {
         if('titleIdx' in target.data)
            delete target.data.titleIdx
       }

    // init head of target
    tcf.insertBefore(initHead(tcf,target.data.head),tcf.querySelector('.tabular_container'));
    document.querySelectorAll('.table_no_display').forEach(d => className.removeClass(d,'table_no_display'))

    row.oriData.length>0?document.querySelectorAll('.cate').
    forEach(d=> className.addClass(d,'table_no_display')):
    document.querySelectorAll('.numerical').
    forEach(d=> className.addClass(d,'table_no_display'))
    swapTableVis(click,tcf);

    bar(row.oriData,row.data,row.index,'row',row.title,row.titleIdx);

    btnContainer.style.display = 'none';
    })
    
  // column button event
  columnBtn.addEventListener('click',
    ()=>{
      document.querySelectorAll('.tabular_highlight').forEach( d =>{
        className.removeClass(d,'tabular_highlight');
      })
     btnContainer.style.display='none'
     let col = colData
      (
          target.ele
          ,target.colTitle
          ,1
      );

     let headInx = rowData(target.ele,target.rowTitle,0).index;

    Object.assign(target.data,{
       data:col.data,
       title:col.title,
       index:col.index,
       oriData:col.oriData,
       head:target.rowTitle[headInx],
       status:'col'});
    if('titleIdx' in col)
       Object.assign(target.data,{titleIdx:col.titleIdx});
       else
          {
            if('titleIdx' in target.data)
               delete target.data.titleIdx
          }
    // init head of target
    tcf.insertBefore(initHead(tcf,target.data.head),tcf.querySelector('.tabular_container'));
    document.querySelectorAll('.table_no_display').forEach(d=> className.removeClass(d,'table_no_display'))

    col.oriData.length>0?document.querySelectorAll('.cate').
    forEach(d=> className.addClass(d,'table_no_display')):
    document.querySelectorAll('.numerical').
    forEach(d=> className.addClass(d,'table_no_display'))
    swapTableVis(click,tcf);

    swapTableVis(click,tcf);

    bar(col.oriData,col.data,col.index,'col',col.title,col.titleIdx);

    btnContainer.style.display = 'none';
    })

  return btnContainer;
}


export default initBtn;
