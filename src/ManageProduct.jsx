import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 150px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #3bb77e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddProductButton = styled(Link)`
  padding: 10px 20px;
  background-color: #3bb77e;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
`;
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f2f2f2;
  max-width: 1100px;
`;

const TableHead = styled.thead`
  background-color: #3bb77e;
  color: #fff;
`;

const TableHeadCell = styled.th`
  padding: 10px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e0f2f1;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  width: 40%;
`;

const NameCell = styled(TableCell)`
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const AddButton = styled(ActionButton)`
  background-color: #4caf50;
  color: #fff;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f44336;
  color: #fff;
`;

const ReadButton = styled(ActionButton)`
  background-color: #ee9a4d;
  color: #fff;
  width: 80px;
  height: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

function ManageProduct() {
  const [data, setData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await axios.get("http://localhost:3000/product"); // Assuming your JSON server is running on localhost:3000
    console.log(res.data);
    setData(res.data);
  };

  // Edit
  const [formvalue, setFormvalue] = useState({
    id: "",
    name: "",
    price: "",
    cate: "",
  });

  const editdata = async (id) => {
    const res = await axios.get(`http://localhost:3000/product/${id}`);
    console.log(res.data);
    setFormvalue(res.data);
  };

  const getform = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    console.log(formvalue);
  };
  const validation = () => {
    var result = true;
    if (formvalue.name === "") {
      toast.error("Name Field is required");
      result = false;
      return false;
    }
    if (formvalue.price === "") {
      toast.error("Price Field is required");
      result = false;
      return false;
    }
    if (formvalue.cate === "") {
      toast.error("category Field is required");
      result = false;
      return false;
    }
    return result;
  };
  //  save edit
  const submithandel = async (e) => {
    e.preventDefault(); // stop page reload
    if (validation()) {
      const res = await axios.patch(
        `http://localhost:3000/product/${formvalue.id}`,
        formvalue
      );
      console.log(res);
      if (res.status === 200) {
        setFormvalue({
          ...formvalue,
          name: "",
          price: "",
          cate: "",
        });
        toast.success("Update success");
        fetch();
      }
    }
  };

  // for delete
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/product/${id}`);
    fetch();
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredData = data.filter((item) => {
        const itemName = item.name.toLowerCase();
        const searchQueryLower = query.toLowerCase();
        return (
          itemName.startsWith(searchQueryLower) ||
          itemName.includes(searchQueryLower)
        );
      });
      setSearchResults(filteredData);
    }
  };

  const handleRead = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <Header>
        <h2>Search item:</h2>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search item"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchButton>Search</SearchButton>
        </SearchContainer>
        <AddProductButton to="/addproduct">Add Product</AddProductButton>
      </Header>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <tr>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>cate</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </TableHead>
          <TableBody>
            {(searchQuery !== "" ? searchResults : data).map(
              (value, index, arr) => {
                return (
                  <TableRow key={value.id}>
                    <TableCell>{value.name}</TableCell>
                    <NameCell>{value.price}</NameCell>
                    <NameCell>{value.cate}</NameCell>

                    <TableCell>
                      <ButtonContainer>
                        <ReadButton
                          variant="info"
                          onClick={() => handleRead(value)}
                        >
                          Read
                        </ReadButton>

                        <AddButton
                          onClick={() => editdata(value.id)}
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          Edit
                        </AddButton>
                        <DeleteButton onClick={() => handleDelete(value.id)}>
                          Delete
                        </DeleteButton>
                      </ButtonContainer>
                      <div className="modal" id="myModal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                              <h4 className="modal-title">Edit Products</h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                              <div className="container">
                                <form action="" method="post">
                                  <div className="row g-4 mp-2">
                                    <div className="col-md-6">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="name"
                                          value={formvalue.name}
                                          onChange={getform}
                                          id="name"
                                          placeholder="Category Name"
                                        />
                                        <label htmlFor="name">Name</label>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="price"
                                          value={formvalue.price}
                                          onChange={getform}
                                          id="image"
                                          placeholder="Price"
                                        />
                                        <label htmlFor="image">Price</label>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="cate"
                                          value={formvalue.cate}
                                          onChange={getform}
                                          id="name"
                                          placeholder="image"
                                        />
                                        <label htmlFor="name">Category</label>
                                      </div>
                                    </div>

                                    <div className="col-12">
                                      <button
                                        onClick={submithandel}
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary w-100 py-3"
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            {/* Modal footer */}
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
      {/* Modal */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <p>Name: {selectedProduct.name}</p>
              <p>Price: {selectedProduct.price}</p>
              <p>Category: {selectedProduct.cate}</p>
              {/* Add more details as needed */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageProduct;
