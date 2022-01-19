import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ItemsManagement from './components/ItemsManagement';
import CollectionsManagement from './components/CollectionsManagement';
import ItemCollectionsManagement from './components/ItemCollectionsManagement';
import Links from './components/Links';

const App = () => {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Links/>}/>
            <Route path="/items" element={<ItemsManagement/>}/>
            <Route path="/collections" element={<CollectionsManagement/>}/>
            <Route path="/itemCollections" element={<ItemCollectionsManagement/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;