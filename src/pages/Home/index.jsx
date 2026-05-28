import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";
import { useEffect, useState, useRef} from "react";

function Home() {

  const inputName = useRef([]);
  const inputAge = useRef([]);
  const inputEmail = useRef([]);


  const [users, setUsers] = useState([]);

  useEffect(() => {
       getUsers();
  }, [getUsers])


    async function getUsers() {
    const response = await api.get('/usuarios');
    
    setUsers(response.data);
  }
  

  async function createUsers() {
     await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
     })    
     getUsers();
  }


   async function deleteUsers(id) {
      await api.delete(`/usuarios/${id}`);
     getUsers();
    }

  return (
    <div className="container">
      <form action="">
        <h1>Castro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName}/>
        <input placeholder="Idade" name="idade" type="number" ref={inputAge}/>
        <input placeholder="Email" name="email" type="email"ref={inputEmail} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
