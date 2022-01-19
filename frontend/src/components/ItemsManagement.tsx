import { useEffect, useState } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";

const initialEditValues = {
  id: "",
  name: "",
  description: "",
  weight: "",
  length: "",
  height: "",
  quantity: ""
}

const initialCreateValues = {
  id: "",
  name: "",
  description: "",
  weight: "",
  length: "",
  height: "",
  quantity: ""
}

const ItemsManagement = () => {

  // Store item  fetched (for DataGrid rows)
  const [items, setItems] = useState<any>([]);
  
  // Store values to create an item
  const [createValues, setCreateValues] = useState(initialCreateValues);

  // Store values to edit an item
  const [editValues, setEditValues] = useState(initialEditValues);

  // Get the values from the selected collection row
  const [selectedRow, setSelectedRow] = useState<any>([]);

  // Store to delete an item
  const [idToDelete, setIdToDelete] = useState("");

  // Disable edit inputs
  const [isDisabled, setIsDisabled] = useState(true);

  // For DataGrid columns
  const itemColumns: any = [
                            { field: "id", headerName: 'ID', flex: 1}, 
                            { field: "name", headerName: 'Name', flex: 1}, 
                            { field: "description", headerName: 'Description', flex: 1}, 
                            { field: "weight", headerName: 'Weight', flex: 1}, 
                            { field: "length", headerName: 'Length', flex: 1}, 
                            { field: "height", headerName: 'Height', flex: 1}, 
                            { field: "quantity", headerName: 'Quantity',flex: 1}
  ]

  const getItems = async(): Promise<AxiosResponse<any>> => {
    return axios.get(`http://localhost:3000/items`)
  }

  const fetchItems = async () => {
    const retrievedItems = await getItems();
    const items : any = [];
    retrievedItems.data.forEach((param : any) => {
      const itemInfo: any = {
        id: param.id,
        name: param.name,
        description: param.description,
        weight: param.weight,
        length: param.length,
        height: param.height,
        quantity: param.quantity,
      };
      items.push(itemInfo);
    });
    setItems(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateChange = (event:any) => {
    const { name, value } = event.target;
    setCreateValues({ ...createValues, [name]: value});
  }

  const handleCreate = () => {
    const data = {
      id: createValues.id,
      name: createValues.name,
      description: createValues.description,
      weight: createValues.weight,
      length: createValues.length,
      height: createValues.height,
      quantity: createValues.quantity,
    };
    axios.post(`http://localhost:3000/item`, data).then(res => {
      const httpRes = res.status + " - " + res.statusText
      alert(httpRes)
    }).catch(err => {
      const httpErr = err.response.data.message
      alert(httpErr)
    })
  }

  const handleEditChange = (event:any) => {
    const { name, value } = event.target;
    setEditValues({ ...editValues, [name]: value});
  }

  const handleEdit = () => {
    if(editValues.id) {
      const data = {
        name: editValues.name,
        description: editValues.description,
        weight: editValues.weight,
        length: editValues.length,
        height: editValues.height,
        quantity: editValues.quantity,
      };
      axios.put(`http://localhost:3000/item/${editValues.id}`, data).then(res => {
        const httpRes = res.status + " - " + res.statusText
        alert(httpRes)
      }).catch(err => {
        const httpErr = err.response.data.message
        alert(httpErr)
      })
    } else {
      alert("Please select an ID to edit.")
    }
  }

  const handleDelete = () => {
    if(idToDelete) { 
      axios.delete(`http://localhost:3000/item/${idToDelete}`).then(res => {
        const httpRes = res.status + " - " + res.statusText
        alert(httpRes)
      }).catch(err => {
        const httpErr = err.response.data.message
        alert(httpErr)
      })
    } else {
      alert("Please select an ID to delete.")
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <div style={{ height: 300, width: '100%' }}>
        <p><b>Items Table</b></p>
        <DataGrid
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = items.filter((row:any) =>
              selectedIDs.has(row.id),
            );
            setSelectedRow(selectedRows);
            setIsDisabled(false)
            setEditValues({
              id: selectedRow[0].id,
              name: selectedRow[0].name,
              description: selectedRow[0].description,
              weight: selectedRow[0].weight,
              length: selectedRow[0].length,
              height: selectedRow[0].height,
              quantity: selectedRow[0].quantity,
            })
          }}
          rows ={items}
          columns = {itemColumns}
        />
      </div>
      <div>
      <p><b> Create Item </b></p>
        <form onSubmit={handleCreate}>
          <label>
            ID:
            <input
                value={createValues.id}
                onChange={handleCreateChange}
                name="id"
            />
          </label>
          <br></br>
          <label>
            Name:
            <input
                value={createValues.name}
                onChange={handleCreateChange}
                name="name"
            />
          </label>
          <br></br>
          <label>
            Description:
            <input
                value={createValues.description}
                onChange={handleCreateChange}
                name="description"
            />
          </label>
          <br></br>
          <label>
            Weight:
            <input
                value={createValues.weight}
                onChange={handleCreateChange}
                name="weight"
            />
          </label>
          <br></br>
          <label>
            Length:
            <input
                value={createValues.length}
                onChange={handleCreateChange}
                name="length"
            />
          </label>
          <br></br>
          <label>
            Height:
            <input
                value={createValues.height}
                onChange={handleCreateChange}
                name="height"
            />
          </label>
          <br></br>
          <label>
            Quantity:
            <input
                value={createValues.quantity}
                onChange={handleCreateChange}
                name="quantity"
            />
          </label>
          <br></br>
          <input type="submit" value="Create" />
        </form>
      </div>
      <div>
        <p><b> Edit Items (double click on any row) </b></p>
        <form onSubmit={handleEdit}>
          <label>
            <b>Selected ID: {editValues.id}</b>
          </label>
          <br></br>
          <label>
            Name:
            <input
                value={editValues.name}
                onChange={handleEditChange}
                name="name"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <label>
            Description:
            <input
                value={editValues.description}
                onChange={handleEditChange}
                name="description"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <label>
            Weight:
            <input
                value={editValues.weight}
                onChange={handleEditChange}
                name="weight"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <label>
            Length:
            <input
                value={editValues.length}
                onChange={handleEditChange}
                name="length"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <label>
            Height:
            <input
                value={editValues.height}
                onChange={handleEditChange}
                name="height"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <label>
            Quantity:
            <input
                value={editValues.quantity}
                onChange={handleEditChange}
                name="quantity"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <input type="submit" value="Confirm Edit" disabled={isDisabled} />
        </form>
      </div>
      <div>
      <p><b> Delete Item </b></p>
        <form onSubmit={handleDelete}>
          <label>
            ID:
            <input
                value={idToDelete}
                onChange={(e) => setIdToDelete(e.target.value)}
            />
          </label>
          <br></br>
          <input type="submit" value="Delete" />
        </form>
      </div>
    </div>
  );
}

export default ItemsManagement;