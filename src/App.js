import React, { useState } from 'react';
import { Products } from './components/products';
import productData from './cardata.json';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 cards per page

  // Filter products based on the search query
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the range of products to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    // change the window location to the first page
    window.history.pushState(null, null, `/page/1`);
  }, [searchQuery]);

  return (
        <Router>
      <div>
      <nav className='navbar'>
            <div className='navbar__search'>
                <input className='navbar__search__input' type="text" placeholder="Search by product name" value={searchQuery} onChange={(e) => {
                    
                    setSearchQuery(e.target.value); 
                    }}/>    
                <i class="navbar__search__icon fi fi-br-search"></i>
            </div>
            {/* dropdown */}
            <div className="dropdown">
                <button className="dropbtn">Relevance <i class="icon fi fi-rs-angle-small-down"></i> </button>
                <div className="dropdown-content">
                    <a href="#">Price</a>
                    <a href="#">Mileage</a>
                    <a href="#">Year</a>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Brand <i class="icon fi fi-rs-angle-small-down"></i> </button>
                <div className="dropdown-content">
                    <a href="#">Suzuki</a>
                    <a href="#">Toyota</a>
                    <a href="#">Mercedes</a>
                </div>
            </div>
        </nav>

        <div className='App'>
          {/* Display car cards in rows */}
            {currentProducts.map((product) => (
              <Products
                key={product.id}
                image={product.image}
                name={product.name}
                year={product.year}
                people={product.people}
                fueltype={product.fuelType}
                drivetype={product.driveType}
                mileage={product.mileage}
                price={product.price}
              />
            ))}
        </div>

        <div className='pagination'>
            <div className='pagination__text'>{currentPage*6} from {productData.length}</div>
            <div className='navigators'>
                
                <Link to={`/page/${(currentPage > 1)? (currentPage- 1): currentPage}`}>
                    <button className='pagination-button paginationIcon'
                        disabled={currentPage === 1}
                        onClick={() => {if(currentPage>0 )handlePageChange(currentPage - 1)}}>
                        <i class=" fi fi-rr-angle-small-left"></i>
                    </button>
                </Link>
                {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => (
                    <Link key={index} to={`/page/${index + 1}`}>
                    <button
                        className={`pagination-button paginationIcon ${
                        currentPage === index + 1 ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                    </Link>
                ))}

                <Link to={`/page/${(currentPage < totalPages)? (currentPage + 1): currentPage}`}>
                    <button className='pagination-button paginationIcon'
                        disabled={currentPage === totalPages}
                        onClick={() => {if(currentPage < totalPages )handlePageChange(currentPage + 1)}}>
                        <i class=" fi fi-rr-angle-small-right"></i>
                    </button>
                </Link>
        </div>
                <Routes>
                    <Route path='/page/:page' render={({ match }) => {
                    const page = parseInt(match.params.page);
                    if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                    }
                    return null;
                    }} />
                </Routes>
            </div>
          
        
      </div>
      </Router>
  );
}

export default App;
