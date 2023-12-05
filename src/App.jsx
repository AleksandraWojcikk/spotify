import { useState, useEffect, useRef } from 'react';
import './index.css'

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(0);
  const audioRef = useRef();

  const selectSong = (selectedSong) => {
    const audioIndex = songs.findIndex(
      (song) => song.audio === selectedSong.audio
    );

    if (audioIndex > 0) {
      setSelectedSong(audioIndex);
    }
  }

  useEffect(() => {
    fetch('/assets/api.json').then((response) => {
      if(response.ok) {
        response.json().then(setSongs)
      }
    })
  }, []);

  if (songs.length < 1) return (<div>Ładowanie...</div>)

  return (
    <div className='min-g-screen bg-gray-900 text-white justify-center items-center flex-col m-auto'>
      <section className='bg-black text-white p-8 text-center'>
        <h1 className='text-3xl font-boldf mb-4'>
          RockinIt Spotify
        </h1>
        <img src={songs[selectedSong].cover} className='mx-auto my-4 w-64 h-64 object-cover shadow-lg'/>
        <div>
          <button onClick={()=>audioRef.current.play()} className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full'>Play</button>
          <button onClick={()=>audioRef.current.pause()} className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full'>Pause</button>
        </div>
        <audio ref={audioRef}>
          <source src={songs[selectedSong].audio} />
        </audio>
      </section>
      <section>
        <h1 className='text-2xl font-semibold mb-4 text-center'>
          Songs:
        </h1>
        <ul className='flex flex-col space-y-2'>
          {songs.map((song) => (
            <li key={song.id} onClick={() => selectSong(song)} className={`py-2 px-4 cursor-pointer rounded-lg ${songs[selectedSong].id === song.id ? 'bg-gray-700' : 'bg-gray-800'}`}>
              {song.title} by {song.author}
            </li>)
          )}
        </ul>
      </section>
    </div>
  )
}

export default App
