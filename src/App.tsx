import React from 'react';
import SetCard from './SetCard';
import SetGroup from './SetGroup';
import storage from './storage';
import { Metre, Set } from './types';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Button } from 'react-bootstrap';

type AppState = {
  setList: Set[];
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { setList: storage.loadSets() }
  }

  handleDoneChange = (setId: string, value: boolean) => {
    var sets = this.state.setList;
    sets = sets.map(s => {
      if (s.id === setId) s.done = value;
      return s;
    });
    this.setState({ setList: sets });
  }

  componentDidUpdate = () => {
    storage.saveAll(this.state.setList);
  }

  clearCache = () => {
    this.setState({ setList: storage.loadSets(true) });
  }

  groupedSets = () => {
    var map = new Map<Metre, Set[]>();
    this.state.setList.forEach((s: Set) => {
      const key = s.metre;
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [s]);
      } else {
        collection.push(s);
      }
    });
    return map;
  }

  render() {
    var setJsx: JSX.Element[] = [];
    this.groupedSets().forEach((sets, metre) => {

      setJsx.push(<div className="sticky-top"><h1>{metre}</h1></div>);
      sets.forEach((s) => setJsx.push(<SetCard key={s.id} set={s} onDoneChange={this.handleDoneChange} />));
    });

    return (
      <div className="App">
        <h1 className="px-4 py-5 text-center">Tunes for Nozzy!</h1>
        <Button className="p-3 mb-4" variant="success" onClick={this.clearCache}>🎵 Start a new gig 🎵</Button>
        {
          Array.from(this.groupedSets()).map(([m, s]) => <SetGroup key={m} metre={m} sets={s} onDoneChange={this.handleDoneChange} />)
        }
      </div>
    );
  }
}

export default App;
