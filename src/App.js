import React from 'react';
import './App.css';
import RenderGrid from './RenderGrid';

var ROW_SIZE = 10;
var COL_SIZE = 10;

class App extends React.Component {
  constructor(props){
      super(props);
  }

  render(){
    return (
      <RenderGrid m={ROW_SIZE} n={COL_SIZE}/>
    );
  }  
}

export default App;
