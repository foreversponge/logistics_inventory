import { useEffect, useState } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from "react-router-dom";

const initialEditValues = {
  id: "",
  name: "",
  description: "",
}

const initialCreateValues = {
  id: "",
  name: "",
  description: "",
}

const CollectionsManagement = () => {

  // Store collections fetched (for DataGrid rows)
  const [collections, setCollections] = useState<any>([]);

  // Store values to create a collection
  const [createValues, setCreateValues] = useState(initialCreateValues);

  // Store values to edit a collection
  const [editValues, setEditValues] = useState(initialEditValues);

  // Get the values from the selected collection row
  const [selectedRow, setSelectedRow] = useState<any>([]);

  // Store to delete a collection
  const [idToDelete, setIdToDelete] = useState("");

  // Disable edit inputs
  const [isDisabled, setIsDisabled] = useState(true);

  // Generate DataGrid columns
  const collectionColumns: any = [
                            { field: "id", headerName: 'Collection ID', flex: 1}, 
                            { field: "name", headerName: 'Name', flex: 1}, 
                            { field: "description", headerName: 'Description', flex: 1},
  ]

  const fetchCollections = async () => {
    const retrievedCollections = await axios.get(`http://localhost:8080/collections`);
    const collections : any = [];
    retrievedCollections.data.forEach((param : any) => {
      const collectionInfo: any = {
        id: param.id,
        name: param.name,
        description: param.description,
      };
      collections.push(collectionInfo);
    });
    setCollections(collections);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreationValueChange = (event:any) => {
    const { name, value } = event.target;
    setCreateValues({ ...createValues, [name]: value});
  }

  const handleCreate = () => {
    const data = {
      id: createValues.id,
      name: createValues.name,
      description: createValues.description,
    };
    axios.post(`http://localhost:8080/collection`, data).then(res => {
      const httpRes = res.status + " - " + res.statusText
      alert(httpRes)
    }).catch(err => {
      const httpErr = err.response.data.message
      alert(httpErr)
    })
  }

  const handleEditValueChange = (event:any) => {
    const { name, value } = event.target;
    setEditValues({ ...editValues, [name]: value});
  }

  const handleEdit = () => {
    if(editValues.id){
      const data = {
        name: editValues.name,
        description: editValues.description
      };
      axios.put(`http://localhost:8080/collection/${editValues.id}`, data).then(res => {
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
      axios.delete(`http://localhost:8080/collection/${idToDelete}`).then(res => {
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
        <p><b>Collections Table</b></p>
        <DataGrid
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = collections.filter((row:any) =>
              selectedIDs.has(row.id),
            );
            setSelectedRow(selectedRows);
            setIsDisabled(false)
            setEditValues({
              id: selectedRow[0].id,
              name: selectedRow[0].name,
              description: selectedRow[0].description
            })
          }}
          rows ={collections}
          columns = {collectionColumns}
        />
      </div>
      <br></br>
      <br></br>
      <div>
        <p><b> Create Collection </b></p>
          <form onSubmit={handleCreate}>
            <label>
              ID:
              <input
                  value={createValues.id}
                  onChange={handleCreationValueChange}
                  name="id"
              />
            </label>
            <br></br>
            <label>
              Name:
              <input
                  value={createValues.name}
                  onChange={handleCreationValueChange}
                  name="name"
              />
            </label>
            <br></br>
            <label>
              Description:
              <input
                  value={createValues.description}
                  onChange={handleCreationValueChange}
                  name="description"
              />
            </label>
            <br></br>
            <input type="submit" value="Create" />
          </form>
      </div>
      <div>
        <p><b> Edit collections (double click on any row) </b></p>
        <form onSubmit={handleEdit}>
          <label>
            <b>Selected ID: {editValues.id}</b>
          </label>
          <br></br>
          <label>
            Name:
            <input
                value={editValues.name}
                onChange={handleEditValueChange}
                name="name"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <label>
            Description:
            <input
                value={editValues.description}
                onChange={handleEditValueChange}
                name="description"
                disabled={isDisabled}
            />
          </label>
          <br></br>
          <input type="submit" value="Confirm Edit" disabled={isDisabled} />
        </form>
      </div>
      <div>
      <p><b> Delete Collection </b></p>
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

export default CollectionsManagement;