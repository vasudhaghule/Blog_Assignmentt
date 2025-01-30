import { MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';

const Search = ({ handleSearch, searchValue, onInputChange }) => {
  return (
    <div className="searchForm">
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Search Blog..."
          value={searchValue}
          onChange={onInputChange}
        />
        <MDBBtn type="submit">Search</MDBBtn>
      </form>
    </div>
  );
};

export default Search;
