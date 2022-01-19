import { useEffect, useState } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from "react-router-dom";

const ItemCollectionsManagement = () => {

  // Store item collections fetched (for DataGrid rows)
  const [itemCollections, setItemCollections] = useState<any>([]);

  // Store items fetched (to edit/delete item collections)
  const [items, setItems] = useState<any>([]);

  // Store collections fetched (to edit/delete item collections)
  const [collections, setCollections] = useState<any>([]);

  // Store item ID to edit
  const [itemId, setItemId] = useState("")

  // Store collection ID to edit
  const [collectionId, setCollectionId] = useState("")

  // Store item ID to delete
  const [deleteItemId, setDeleteItemId] = useState("")

  // Store collection ID to delete
  const [deleteCollectionId, setDeleteCollectionId] = useState("")

  // For DataGrid columns
  const itemCollectionColumns: any = [
    { field: "itemId", headerName: 'Item ID', flex: 1}, 
    { field: "collId", headerName: 'Collection ID', flex: 1},
    { field: "collName", headerName: "Collection Name", flex: 1}
  ]

  const fetchItems = async () => {
    const retrievedItems = await axios.get(`http://localhost:3000/items`);
    setItems(retrievedItems.data)
  };
  
  const fetchCollections = async () => {
    const retrievedCollections = await axios.get(`http://localhost:3000/collections`);
    setCollections(retrievedCollections.data)
  };

  const fetchItemCollections = async () => {
    const retrievedItemCollections = await axios.get(`http://localhost:3000/itemCollections`);
    const tempItemCollections : any = [];
    let uselessId = 0;
    retrievedItemCollections.data.forEach((element : any) => {
      const itemCollectionInfo: any = {
        id: uselessId,
        itemId: element.itemId,
        collId: element.collectionId,
        collName: element.collection.name,
      };
      tempItemCollections.push(itemCollectionInfo);
      uselessId += 1
    });
    setItemCollections(tempItemCollections);
  };

  useEffect(() => {
    fetchItems();
    fetchCollections();
    fetchItemCollections();
  }, []);

  const handleCreateCollectionChange = (e:any) => {
    setCollectionId(e.target.value)
  }

  const handleCreateItemChange = (e:any) => {
    setItemId(e.target.value)
  }

  const handleDeleteItemChange = (e:any) => {
    setDeleteItemId(e.target.value)
  }

  const handleDeleteCollectionChange = (e:any) => {
    setDeleteCollectionId(e.target.value)
  }

  const handleSubmit = () => {
    const data = {
      itemId: itemId,
      collectionId: collectionId,
    };
    axios.post(`http://localhost:3000/itemCollection`, data).then(res => {
      const httpRes = res.status + " - " + res.statusText
      alert(httpRes)
    }).catch(err => {
      const httpErr = err.response.data.message
      alert(httpErr)
    })
  }

  const handleDelete = (e:any) => {
    if (deleteItemId && deleteCollectionId) {
      axios.delete(`http://localhost:3000/itemCollection/${deleteItemId}/${deleteCollectionId}`).then(res => {
        const httpRes = res.status + " - " + res.statusText
        alert(httpRes)
      }).catch(err => {
        const httpErr = err.response.data.message
        alert(httpErr)
      })
    } else {
      alert("Please select an item/collection pair to delete.")
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <div style={{ height: 300, width: '100%' }}>
        <p><b>Item Collections Table</b></p>
        <DataGrid
          rows ={itemCollections}
          columns = {itemCollectionColumns}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <form onSubmit={handleSubmit}>
          <p><b> Assign item to a collection</b></p>
          <p>Item: </p> 
          <select defaultValue="DEFAULT" onChange={handleCreateItemChange}>
            <option value="DEFAULT" disabled> Select an Item </option>
            {items.map((e:any, key: any) => {
              return <option value={e.id}>{e.id}</option>
            })}
          </select>
          <br></br>
          <p>Collection: </p> 
          <select defaultValue="DEFAULT" onChange={handleCreateCollectionChange}>
          <option value="DEFAULT" disabled> Select a Collection </option>
            {collections.map((e:any, key: any) => {
              return <option value={e.id}>{e.id} ({e.name})</option>
            })}
          </select>
          <br></br>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <br></br>
      <div>
      <p><b> Delete Collection </b></p>
        <form onSubmit={handleDelete}>
          <p>Item: </p> 
          <select defaultValue="DEFAULT" onChange={handleDeleteItemChange}>
            <option value="DEFAULT" disabled> Select an Item </option>
            {items.map((e:any, key: any) => {
              return <option value={e.id}>{e.id}</option>
            })}
          </select>
          <br></br>
          <p>Collection: </p> 
          <select defaultValue="DEFAULT" onChange={handleDeleteCollectionChange}>
          <option value="DEFAULT" disabled> Select a Collection </option>
            {collections.map((e:any, key: any) => {
              return <option value={e.id}>{e.id} ({e.name})</option>
            })}
          </select>
          <input type="submit" value="Delete" />
        </form>
      </div>
      <br></br>
    </div>
  );
}

export default ItemCollectionsManagement;