import React from "react";

export default function List({data, handleEdit, handleDelete}) {
  return (
    <div className="list-group">
      {
        data.map((contact)=> {
          return(
            <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Nama : {contact.nama}</h5>
              <div>
                <button onClick={()=> handleEdit(contact.id_user)} className="btn btn-sm btn-outline-primary">Edit</button>
                <button onClick={()=> handleDelete(contact.id_user)} className="btn btn-sm btn-outline-danger">Del</button>
              </div>
            </div>
            <p className="mb-1">No.telp : {contact.telp}</p>
          </div>
          )
        })
      }
    </div>
  );
}
