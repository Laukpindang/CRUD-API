import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

function App() {

const[contact, setContact] = useState([]);

const [isUpdate, setIsUpdate] = useState({
  id_user: null,
  status: false
})

const [formData, setFormData] = useState({
  nama: '',
  telp: '',
})

useEffect(() => {
  //ambil data; untuk latihan mandiri ubah link menjadi 'https://localhost:3000 atau 3001/contact'
  axios.get('https://5163-2001-448a-302c-326a-e5d3-1ce1-9475-a65f.ngrok.io/api/users/').then((res) =>{
    setContact(res?.data ?? [])
  })
},[])

function handleChange(e){
  let data = {...formData};
  data[e.target.name] = e.target.value;
  setFormData(data);
}

function handleSubmit(e) {
  e.preventDefault()
  let data = [...contact]
  if (formData.nama ==="") {
    alert('mohon diisi')
    return false
  }
  if (formData.telp ==="") {
    alert('mohon diisi')
    return false
  }

  if (isUpdate.status) {
    data.forEach((contact) =>{
      if (contact.id_user === isUpdate.id_user) {
        contact.nama = formData.nama;
        contact.telp = formData.telp;
      }
    });

    axios.put(`https://5163-2001-448a-302c-326a-e5d3-1ce1-9475-a65f.ngrok.io/api/users/${isUpdate.id_user}`, {
      nama: formData.nama, telp: formData.telp
    }).then(res => {
      alert('berhasil mengedit data')
    })

  }else{
    let newData = {id_user: uid(), nama: formData.nama, telp: formData.telp}
    data.push(newData)
    axios.post('https://5163-2001-448a-302c-326a-e5d3-1ce1-9475-a65f.ngrok.io/api/users/', newData).then(res => {
      alert('berhasil menyimpan data')
    })
  }

  setContact(data);
  setIsUpdate({id_user: null, status: false})
  setFormData({nama: '', telp:''})
}

  function handleEdit(id_user) {
    let data = [...contact]
    let foundData = data.find((contact) => contact.id_user === id_user)
    setFormData({nama: foundData.nama, telp:foundData.telp})
    setIsUpdate({id_user: id_user, status: true})
}

  function handleDelete(id_user) {
    console.log(id_user);
    let data = [...contact]
    let filteredData = data.filter(contact => contact.id_user !== id_user)
    axios.delete(`https://5163-2001-448a-302c-326a-e5d3-1ce1-9475-a65f.ngrok.io/api/users/${id_user}`).then(res => {
      alert('berhasil menghapus data')
    })
    setContact(filteredData)
}

  return (
    <div className="App">
      <h1 className="px-3 py-3"><center>My Contact List</center></h1>
      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={formData.nama}
          name="nama"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={formData.telp}
          name="telp"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleDelete={handleDelete} handleEdit={handleEdit} data={contact} />
    </div>
  );
}

export default App;
