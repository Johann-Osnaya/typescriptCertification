import React from 'react';
import  axios  from 'axios';
import { useState, useEffect } from 'react';
import { Diary } from './types';
function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [notifcation, setNotification] = useState('')
  

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data);
      setDate(new Date().toISOString().split('T')[0].toString())
    })
  },[])

  const DiaryCreation = (event: React.SyntheticEvent) => {
      event.preventDefault()
      const DiaryToAdd = {
        date,
        visibility,
        weather,
        comment
      }
      setComment('')
      axios.post<Diary>('http://localhost:3001/api/diaries', DiaryToAdd).then(response => {
        setDiaries(diaries.concat(response.data))
      })
      .catch(error => {
        if(axios.isAxiosError(error)) {
          setNotification(error.response?.data)
          setTimeout(() => {
            setNotification('')
          }, 5000)
        }
        else {
          setNotification('Something went wrong, try again')
          setTimeout(() => {
            setNotification('')
          }, 5000)
        }
      })
    }

    const selectVisibility = (value: string) => {
      setVisibility(value);
    }

    const selectWeather = (value: string) => {
      setWeather(value);
    }


  return (
    <div>
      <h3>add new entry</h3>
      {notifcation !== '' && <p style={ {color: 'red'}}>{notifcation}</p>}
      <form onSubmit={DiaryCreation}>
        date: <input type='date' value={date}
        onChange={(event) => setDate(event.target.value)}
        />
        <br/>
        visibility: great <input type='radio' name='vis'
        onChange={() => selectVisibility('great')}
        />
        good <input type='radio' name='vis'
        onChange={() => selectVisibility('good')}
        />
        ok <input type='radio' name='vis'
        onChange={() => selectVisibility('ok')}
        />
        poor <input type='radio' name='vis'
        onChange={() => selectVisibility('poor')}
        />
        <br/>
        weather: sunny <input type='radio' name='wea'
        onChange={() => selectWeather('sunny')}
        />
        rainy <input type='radio' name='wea'
        onChange={() => selectWeather('rainy')}
        />
        cloudy <input type='radio' name='wea'
        onChange={() => selectWeather('cloudy')}
        />
        stormy <input type='radio' name='wea'
        onChange={() => selectWeather('stormy')}
        />
        windy <input type='radio' name='wea'
        onChange={() => selectWeather('windy')}
        />
        <br/>
        comment: <input value={comment}
        onChange={(event) => setComment(event.target.value)}
        />
        <br/>
        <button type='submit'>add</button>
      </form>

      <h3>Diary entries</h3>
      {diaries.map((diary : Diary) => {
        return (
          <div key={diary.id}>
            <h4>{diary.date}</h4>
            visibility: {diary.visibility}
            <br/>
            weather: {diary.weather}
          </div>
        )
      })}
    </div>
  );
}

export default App;
