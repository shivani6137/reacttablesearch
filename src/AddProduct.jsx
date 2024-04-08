import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f2f2f2;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #3bb77e;
  color: #fff;
  cursor: pointer;
`;
const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const AddProduct = () => {
  const [formvalue, setFormvalue] = useState({
    name: "",
    price: "",
    cate: ""
  });

  const getform = (e) => {
    setFormvalue({
      ...formvalue,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value,
    });
    console.log(formvalue);
  };

  const submithandle = async (e) => {
    e.preventDefault(); //stop page relaod
    const res = await axios.post("http://localhost:3000/product", formvalue);
    console.log(res);
    if (res.status === 201) {
      setFormvalue({
        ...formvalue,
        name: "",
    price: "",
    cate: ""
      });
      alert("Products Added success");
      return false;
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add Products</FormTitle>
      <form action="" method="post" onSubmit={submithandle}>
        <FormGroup>
          <FormLabel>Name:</FormLabel>
          <FormInput
            type="text"
            name="name"
            value={formvalue.name}
            onChange={getform}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Price:</FormLabel>
          <FormInput
            type="number"
            name="price"
            value={formvalue.price}
            onChange={getform}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Category:</FormLabel>
          <FormSelect
            name="cate"
            value={formvalue.cate}
            onChange={getform}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Shirt</option>
            <option value="Clothing">Pants</option>
            <option value="Books">T-shirts</option>
            <option value="Furniture">Joggers</option>
            {/* Add more options as needed */}
          </FormSelect>
        </FormGroup>
        <FormButton type="submit">Submit</FormButton>
      </form>
    </FormContainer>
  );
};

export default AddProduct;
