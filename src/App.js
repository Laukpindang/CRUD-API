import "./App.css";
import List from "./List";
import { useState } from "react";
import { uid } from "uid";

function App() {

  const[contact, setContact] = useState([{
    id: 1,
    name: "Jhon Doe",
    telp: "08832413421",
  },
  {
    id: 2,
    name: "Alex Picker",
    telp: "08832413421",
  }
]);

const [isUpdate, setIsUpdate] = useState({
  id: null,
  status: false
})

const [formData, setFormData] = useState({
  name: '',
  telp: '',
})

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
  }else{
    data.push({id: uid(), name: formData.name, telp: formData.telp})
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
