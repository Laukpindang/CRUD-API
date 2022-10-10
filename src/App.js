import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

function App() {

const[contact, setContact] = useState([]);

const [isUpdate, setIsUpdate] = useState({
  id: null,
  status: false
})

const [formData, setFormData] = useState({
  name: '',
  telp: '',
})

useEffect(() => {
  //ambil data
  axios.get('http://localhost:3000/contact').then((res) =>{
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
  if (formData.name ==="") {
    return false
  }
  if (formData.telp ==="") {
    return false
  }

  if (isUpdate.status) {
    data.forEach((contact) =>{
      if (contact.id === isUpdate.id) {
        contact.name = formData.name;
        contact.telp = formData.telp;
      }
    });

    axios.put(`http://localhost:3000/contact/${isUpdate.id}`, {
      name: formData.name, telp: formData.telp
    }).then(res => {
      alert('berhasil mengedit data')
    })

  }else{
    let newData = {id: uid(), name: formData.name, telp: formData.telp}
    data.push(newData)
    axios.post('http://localhost:3000/contact', newData).then(res => {
      alert('berhasil menyimpan data')
    })
  }

  setContact(data);
  setIsUpdate({id: null, status: false})
  setFormData({name: '', telp:''})
}

  function handleEdit(id) {
    let data = [...contact]
    let foundData = data.find((contact) => contact.id === id)
    setFormData({name: foundData.name, telp:foundData.telp})
    setIsUpdate({id: id, status: true})
  }

  function handleDelete(id) {
    let data = [...contact]
    let filteredData = data.filter(contact => contact.id !== id)
    axios.delete(`http://localhost:3000/contact/${id}`).then(res => {
      alert('berhasil menghapus data')
    })
    setContact(filteredData)
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={formData.name}
          name="name"
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
