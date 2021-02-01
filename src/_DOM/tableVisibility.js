'use strict';

const tableVisibility={
    HideColumn:function(table,index){

        let header =  table.getElementsByTagName('th');
        let rows = table.getElementsByTagName('tr');                  
        for (var row = 0; row < rows.length; row++){
          var currentRow = rows[row];        
          currentRow.cells[index].style.display = 'none';
        }

    }, HideRow: function (table, index){
        let rows = table.getElementsByTagName('tr');   
        rows[index].style.display = 'none';
    }
};

export default tableVisibility;