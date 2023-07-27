import React, { useState, useEffect } from 'react'
// 👉 TASK 1 - import the axios lib from node_modules
import axios from 'axios'
// 👉 TASK 2 - import the contants from constants/index.js
import { BASE_URL, API_KEY } from '../constants';
import Details from './Details'
import Friend from './Friend';

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState(null)


  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  // 👉 TASK 3 - make an effect that runs after FIRST DOM surgery
  // caused by the first render only. You'll need `useEffect` from React.
  // The effect should consist of a call to the API using axios.
  // On success, set the array of friend objects from the API into state.

  /* useEffect(()=> {
     async function getData() {
     const res = await axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
     try {
       setFriends(res.data)
     } catch {
       console.log(err)
     }
     }
     getData(); 
   },[])*/

  ///or
  useEffect(() => {
    function getData() {
      axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
        .then((res) => {
          setFriends(res.data)
        })
        .catch((e) => {
          console.error(e)
        })
    }
    getData();
  }, []);
  return (
    <div className='container'>
      <h1>Some of my friends:</h1>
      {/* start by mapping over the friends array...*/}
      {
        friends.map(fr=> {
          return <Friend key = {fr.id} info = {fr} openDetails = {openDetails} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
