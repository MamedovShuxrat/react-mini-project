import React, { useEffect, useState } from "react";
import { Users } from "./components/Users/Users";
import Success from "./components/Success";

function App() {
  const [users, setUsers] = useState([])
  const [invite, setInvite] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [succes, setSuccess] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data)
      }).catch((err) => {
        console.error(err, 'Ошибка при получений данных')
      }).finally(() => setLoading(false))

  }, [])
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invite.includes(id)) {
      setInvite(prev => prev.filter((_id) => (_id !== id)))
    } else {
      setInvite((prev) => [...prev, id])
    }
  }

  const onSendMassage = () => {
    setSuccess(true)
  }
  return (
    <div className="App">
      {succes ? (<Success count={invite.length} />) : (< Users
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        items={users}
        isLoading={isLoading}
        invite={invite}
        onClickInvite={onClickInvite}
        onSendMassage={onSendMassage}
      />)}
    </div>
  );
}

export default App;
