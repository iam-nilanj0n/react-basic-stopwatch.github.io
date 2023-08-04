
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [timer, setTimer] = useState(0);
  const castRef = useRef([])
  const countRef = useRef(null)
  const [miliSec, setMiliSec] = useState('000')
  const milisecRef = useRef(null)

  useEffect(() => {
    let strng = `${miliSec % 1000}`
    if (strng.length === 0) {
      setMiliSec('000')
    }
    if (strng.length === 1) {
      setMiliSec(`00${strng}`)
    }
    if (strng.length === 2) {
      setMiliSec(`0${strng}`)
    }
    if (strng.length === 3) {
      setMiliSec(strng)
    }
  }, [miliSec])

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)

    milisecRef.current = setInterval(() => {
      setMiliSec(miliSec => `${Number(miliSec) + 5}`)
    }, 5)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    clearInterval(milisecRef.current)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    clearInterval(milisecRef.current)
    setMiliSec(0)
    setTimer(0)
  }
  const handleCast = () => {
    castRef.current = [...castRef.current, [`${`0${Math.floor(timer / 3600)}`.slice(-2)}:${`0${`${Math.floor(timer / 60)}` % 60}`.slice(-2)}:${`0${(timer % 60)}`.slice(-2)}:${miliSec}`]]
  }

  return (
    <div className="App" >

      <section className='timeDisplay'>
        <p>{`0${Math.floor(timer / 3600)}`.slice(-2)} : {`0${`${Math.floor(timer / 60)}` % 60}`.slice(-2)} : {`0${(timer % 60)}`.slice(-2)} : {miliSec}</p>
      </section>

      <section className='buttonsSection'>
        <button className='Pause' onClick={(e) => handlePause(e)}>Pause</button>
        <button className='Start' onClick={(e) => handleStart(e)}>Start</button>
        <button className='Reset' onClick={(e) => { handleReset(e) }}>Reset</button>
        <button className='Cast' onClick={(e) => { handleCast(e) }}>Cast</button>
      </section>

      <h2>Cast</h2>

      {(castRef.current.length > 0) ? (
        <section className='castSection'>
          {castRef.current.map((e, i) => {
            return (
              <div key={i} className='listDiv'>Player {i + 1} : <span>{e}</span></div>
            )

          })}
        </section>
      ) : (<></>)}

    </div>
  );
}

export default App;
