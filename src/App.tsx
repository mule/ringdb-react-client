import React from 'react';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <h1>Yet another ringsdb client</h1>
        </div>
        <div className='row'>
          <form>
            <div className="mb-3">
              <label  className="form-label">
                Search for a decklist here
                <input type="text" className="form-control" id="deckSearch" placeholder="Decklist id" /> 
              </label>           
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
