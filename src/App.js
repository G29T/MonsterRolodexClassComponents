import { Component } from 'react'
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/serach-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchedField: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(() => {
      return {monsters: users}
    },
    ()=> console.log(this.state))
    );
  }

  onSearchChange = (event) => {
    const searchedField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return {searchedField}
    })
  }

render() {
  const { monsters, searchedField } = this.state;
  const { onSearchChange } = this;

  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchedField);
  });

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      
      {/* <input className='search-box' type='search' placeholder='serach monsters' onChange={onSearchChange}/> */}
      <SearchBox className='monsters-search-box' searchedField={searchedField} onChangeHandler={onSearchChange} />
 
      {/* {filteredMonsters.map((monster) => {
        return (
          <div key={monster.id}><h1>{monster.name}</h1></div>
        );
      }
      )} */}
      <CardList monsters={filteredMonsters} />
    </div>
  );
}
}

export default App;