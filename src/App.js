import React, { Component } from 'react';
import './App.css';


class ListItem extends Component{
  got = (e) => {
    this.props.onUpdate(this.props.item);
  }

  delete = (e) => {
    this.props.onDelete(this.props.item);
  }

  render(){
    return (
      <li>
        {this.props.item}
        &nbsp; 
        <button onClick={this.got}>
          {
            (this.props.has) ? 
            <strong style={{color: "green"}}>✓</strong> : 
            <strong style={{color: "red"}}>&times;</strong>
          }
        </button>
        <button onClick={this.delete}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </li>
    );
  }
}

class GroceryList extends Component {
  update = (item) => {
    this.props.onUpdate(item);
  }

  delete = (item) => {
    this.props.onDelete(item);
  }

  render() {
    return (
      <ol>
        {
          this.props.arr.map( (x, index) => 
            <ListItem 
              key={index} 
              item={x.name} 
              has={x.has} 
              onUpdate={this.props.update} 
              onDelete={this.props.delete}
            />
          )
        }
      </ol>
    );
  }
}


class GroceryForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: "",
      error: "",
      valid: false
    }
  }
  
  changeItem = (e) => {
    this.setState({item: e.target.value}, () => {
      if(this.state.item.length < 2){
        this.setState({error: "Item must be 2 characters or more!", valid: false});
      }else{
        this.setState({error: "", valid: true});
      }
    });
  }

  addItem = (e) => {
    e.preventDefault();
    this.props.onNewItem({name: this.state.item, has: false});
    this.setState({item: "", valid: false});
  }

  render() {
    return (
      <form onSubmit={this.addItem}>
        <input 
          type="text" 
          name="item" 
          onChange={this.changeItem} 
          value={this.state.item}
        />
        <span>{this.state.error}</span>
        {
          (this.state.valid) ?
          <input type="submit" /> :
          <input type="submit" disabled />
        }
      </form>
    );
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      groceries: [
        {name: "Carrots", has: false},
        {name: "Cremini Mushrooms", has: false},
        {name: "Beef Stock", has: true},
        {name: "Pearl Onions", has: true}
      ]
    }
  }

  addItem = (item) => {
    let items = [...this.state.groceries];
    items.push(item);
    this.setState({groceries: items});
  }

  youGot = (item) => {
    let list = [...this.state.groceries];
    for(let i=0; i<list.length; i++){
      if(list[i].name === item){
        list[i].has = !list[i].has;
        break;
      }
    }
    this.setState({groceries: list});
  }

  meh = (x) => {
    let list = [...this.state.groceries];
    list = list.filter(item => item.name !== x);
    this.setState({groceries: list});
  }

  render() {
    return (
      <div className="container">
        <GroceryList arr={this.state.groceries} update={this.youGot} delete={this.meh}/>
        <GroceryForm onNewItem={this.addItem} />
      </div>
    );
  }
}

export default App;
