import './App.css';
import { useState, useEffect } from 'react';
import { poker, allCards } from './Card';

var deck = [...poker];
var gamedeck = [];

export default function App() {
  let card = Math.floor(Math.random() * deck.length);
  // var deck =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // var gamedeck = []
  const [currentcard, setCurrentcard] = useState(0);
  const [index, setIndex] = useState(0);
  const [over, setOver] = useState(false);
  const [win, setWin] = useState(false);
  const [lucky, setLucky] = useState(false);


  useEffect(() => {
    document.addEventListener('keyup', start);
    return () => {
      document.removeEventListener('keyup', start);
    }
  });

  useEffect(() => {
    document.addEventListener('keyup', nextCard);
    return () => {
      document.removeEventListener('keyup', nextCard);
    }
  });


  useEffect(() => {
    document.addEventListener('keyup', slap);
    return () => {
      document.removeEventListener('keyup', slap);
    }
  });




  function start(e) {
    if (index == 0) {
      if (e.code == "KeyA") {
        setIndex(index + 1);
        setOver(false);
        setWin(false);
        setLucky(false);
        deck = [...poker];
        gamedeck = [];
        setCurrentcard(deck[card]);
      }
    }
  }


  function nextCard(e) {
    if (index > 0) {
      if (e.code == 'ArrowRight') {
        // <Check />
        //create another checking that if the index has exceeded the length of the deck, reset
        // set the the index + 1
        if (index < 13) {
          setIndex(index + 1);
        } else if (index == 13) {
          setIndex(1);
        }
        // remove the currentcard from the deck
        deck.splice(deck.indexOf(currentcard), 1);
        // adding the currentcard to the gamedeck
        gamedeck.push(currentcard);
        // set the mew currentcard 
        card = Math.floor(Math.random() * deck.length);
        setCurrentcard(deck[card]);
        if (index == currentcard) {
          setOver(true);
          alert('Oops! You Missed The Slap.')
          setIndex(0);
        } else if (deck.length == 0) {
          setLucky(true);
          setIndex(0);
        }
      }
    }
  }


  //create a function that checks whether the index and the currentcard are the same and if the user has clicked slap or next. 
  // try to useRef

  // let check = (e) => {
  //   if (deck.length == 0) {
  //     setLucky(true);
  //     setRestartbtn(true);
  //     setIndex(0);
  //   }
  //   if (index == currentcard) {
  //     if (e.target == slapRef.current) {
  //       setWin(true);
  //       setRestartbtn(true);
  //       setIndex(0);
  //     } else if (e.target == nextRef.current) {
  //       setOver(true);
  //       setRestartbtn(true);
  //       alert('Oops! You Missed The Slap.')
  //       setIndex(0);
  //     }
  //   } else if (index != currentcard) {
  //     if (e.target == slapRef.current) {
  //       setOver(true);
  //       setRestartbtn(true);
  //       alert('Oops! You Slap The Wrong Card.')
  //       setIndex(0);
  //     }
  //   }
  // }


  function slap(e) {
    if (index > 0) {
      if (e.code == "Space") {
        if (index == currentcard) {
          setWin(true);
          setIndex(0);
        } else if (index != currentcard) {
          setOver(true);
          alert('Oops! You Slap The Wrong Card.')
          setIndex(0);
        }
      }
    }
  }





  function Gamestart({ index, currentcard }) {
    //if the index is 0, then display "press to start"; 
    // otherwise display the currentcard so the user can determine to click slap or next
    return (
      <>
        {!over && !win && !lucky &&
          <div className="body">
            {index == 0 ?
              <>
                <p className='start'>* press "A" to start *</p>
                <div className="rule">
                  <p><b>How To Play:</b></p>
                  <hr className="hr" />
                  <br />
                  <label>"Arrow Right" :</label>deal card
                  <br /><br />
                  <label>"Space Bar" :</label>slap
                </div>
              </> :
              <>
                <div className='playground'>
                  <div className="poker">
                    <span className="cards">{allCards[index]}</span>
                    <p>Counter</p>
                  </div>
                  <div className="poker">
                    <span className="cards">{allCards[currentcard]}</span>
                    <p>Current Card</p>
                  </div>
                </div>
                <br /> <br />
                <div className="rule">
                  <p><b>How To Play:</b></p>
                  <hr className="hr" />
                  <br />
                  <label>"Arrow Right" :</label>deal card
                  <br /><br />
                  <label>"Space Bar" :</label>slap
                </div>
              </>
            }
          </div>
        }
        {over &&
          <>
            <br /><br />
            <p className="bigbig">Game Over</p>
            <br /><br />
            <b>* press "A" to restart *</b>
          </>
        }
        {win &&
          <>
            <br /><br />
            <p className="bigbig">You Win !!</p>
            <br /><br />
            <b>* press "A" to restart *</b>
          </>
        }
        {lucky &&
          <>
            <br /><br />
            <p className="bigbig">You Win!!<br />
              Lady Luck Smiled On You !!</p>
            <br /><br />
            <b>* press "A" to restart *</b>
          </>
        }
      </>
    )

  }

  // you can use keyboard to play this game. remember the target.e and keycode in our previous repli note. 
  // insert the gamestart component with the neccessary props

  return (
    <main>
      <>
        <p id="title">SlapJack</p>
        <hr className="hr2" />
        <Gamestart index={index} currentcard={currentcard} />
      </>
    </main >
  )

}
