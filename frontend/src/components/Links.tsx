import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/items">Items Table (Create, Edit, Delete)</Link>
        </li>
        <li>
          <Link to="/collections">Collection Table (Create, Edit, Delete)</Link>
        </li>
        <li>
          <Link to="/itemCollections">Item Collection Table (Create, Edit, Delete)</Link>
        </li>
      </ul>
    </div>
  );
}

export default Links;


