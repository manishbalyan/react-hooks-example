import React,{useState,useEffect} from 'react';
import './App.css';

function App() {

  // initial state of the game
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };

  // snippet array for the value to be select to type for user
  const SNIPPETS = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'
  ];

  // useState hook for setting the snippet value 
  const [snippet, setSnippet] = useState('');

  // useState hook for setting the user input value 
  const [userText, setUserText] = useState(''); 

  // useState hook for setting the game state 
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  // useEffect hook for settng the document title as victory if user get victory
  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });

  // method to update user input value and set the game state using setUserText and setGameState methods of useState hook
  const updateUserText = event => {
    setUserText(event.target.value);
    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  }

  // method to select the snippet for typing using setSnippet and setGameState methods of useState hook
  const chooseSnippet = snippetIndex => () => {
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  };


  return (
    <div className='App'>
      <h2>Typing Game</h2>
      <hr />
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }
    </div>
  );
}

export default App;
