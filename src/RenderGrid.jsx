import React from 'react';
import './App.css';

class RenderGrid extends React.Component {
    componentDidMount(){
        this.createGrid();
        this.setMines();
    }

    createGrid = () =>{
        var table = document.getElementById('table-grid');
        for (var i=0; i<this.props.m; i++) {
            var row = table.insertRow(i);
            for (var j=0; j<this.props.n; j++) {
                var cell = row.insertCell(j);
                cell.onclick = this.handleClick;
            }
        }
    }

    setMines(){
        var num_of_mines = (this.props.m * this.props.n) / 5;
        for (var i=0; i<num_of_mines; i++) {
            var row = Math.floor(Math.random() * this.props.m);
            var col = Math.floor(Math.random() * this.props.n);
            var cell = document.getElementById('table-grid').rows[row].cells[col];
            cell.setAttribute("class","mines");
        }
    }

    handleClick = (e) => {
        var cell = e.currentTarget;
        var row = cell.parentNode.rowIndex;
        var col = cell.cellIndex;
        if(cell.className === 'mines') {
            this.showAllMines();
            alert("Game Over!! Please refresh to start a New Game");
            document.getElementById('game-end-overlay').style.display = 'block';
        } else {
            var closeby_cell_indexes = [
                                    [row-1,col-1],[row-1,col],[row-1,col+1],
                                    [row,col-1],[row,col+1],
                                    [row+1,col-1],[row+1,col],[row+1,col+1]
                                ];
            
            var count = 0;
            for(var i=0;i<closeby_cell_indexes.length;i++){
                var row_val = closeby_cell_indexes[i][0];
                var col_val = closeby_cell_indexes[i][1];
                if(row_val >= 0 && row_val < this.props.m && col_val >= 0 && col_val < this.props.n){
                    var cell_elem =  document.getElementById('table-grid').rows[row_val].cells[col_val];
                    if(cell_elem.className === 'mines'){
                        count++;
                    }
                }
            }
            cell.innerHTML = count;
        }
    }

    showAllMines = () => {
        var all = document.querySelectorAll('.mines');
        for (var i = 0; i < all.length; i++) {
            all[i].innerHTML = '&#xf1e2;';
            all[i].style.backgroundColor = "red";
            all[i].style.font = "normal normal normal 18px/1 FontAwesome";
        }
    }

    render(){
        return (
            <>
                <table id="table-grid">
                </table>
                <div id="game-end-overlay"></div>
            </>
        );
    }
}

export default RenderGrid;
