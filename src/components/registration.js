import React, { useState } from "react";
import "../App.css";
import { connect } from "react-redux";
import { addUser } from "../Redux/userActions";
import { deleteUser } from "../Redux/userActions";

const Registration = ({ users, addUser, deleteUser }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    address: [""],
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    name: false,
    dob: false,
    phone: false,
    address: [false],
    password: false,
    confirmPassword: false,
  });
  const handleChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
    setFormError((prevError) => ({
      ...prevError,
      [field]: false,
    }));
  };

  const handleDelete = (index) => {
    const userToDelete = users[index];
    deleteUser(userToDelete);
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];
    setFormData({
      name: userToEdit.name,
      dob: userToEdit.dob,
      phone: userToEdit.phone,
      address: userToEdit.address,
      password: userToEdit.password,
      confirmPassword: userToEdit.confirmPassword,
    });
    setEditingIndex(index);
  };

  const handleAddAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      address: [...prevData.address, ""],
    }));
  };

  const handleRemoveAddress = () => {
    if (formData.address.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        address: prevData.address.slice(0, -1),
      }));
    }
  };

  const handleChangeAddress = (e, index) => {
    const newAddresses = [...formData.address];
    newAddresses[index] = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      address: newAddresses,
    }));
    setFormError((prevError) => ({
      ...prevError,
      address: prevError.address.map((error, i) =>
        i === index ? false : error
      ),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dob = formData.dob;
    const dobDate = new Date(dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const phoneNumber = formData.phone;
    const password = formData.password;
    const addresses = formData.address;
    const isValidAddress = addresses.every((address) => address.trim() !== "");
    if (
      formData.name.trim() === "" ||
      formData.name.length > 20 ||
      !/^[a-zA-Z\s]*$/.test(formData.name)
    ) {
      setFormError((prevError) => ({
        ...prevError,
        name: true,
      }));
      return;
    } else if (!dob || dobDate > today || formData.dob.trim() === "") {
      setFormError((prevError) => ({
        ...prevError,
        dob: true,
      }));

      return;
    } else if (
      !phoneNumber ||
      isNaN(phoneNumber) ||
      phoneNumber.length < 8 ||
      phoneNumber.length > 10 ||
      phoneNumber.trim() === ""
    ) {
      setFormError((prevError) => ({
        ...prevError,
        phone: true,
      }));

      return;
    } else if (!isValidAddress) {
      setFormError((prevError) => ({
        ...prevError,
        address: true,
      }));

      return;
    } else if (
      !password ||
      password.length < 10 ||
      !/[A-Z]/.test(password) ||
      !/[!@#%^&*]/.test(password)
    ) {
      setFormError((prevError) => ({
        ...prevError,
        password: true,
      }));

      return;
    } else if (formData.password !== formData.confirmPassword) {
      setFormError((prevError) => ({
        ...prevError,
        confirmPassword: true,
      }));

      return;
    }

    if (editingIndex !== null) {
      const updatedUser = { ...formData };
      addUser(updatedUser, editingIndex);
    } else {
      addUser(formData);
    }
    setFormData({
      name: "",
      dob: "",
      phone: "",
      address: [""],
      password: "",
      confirmPassword: "",
    });
    setEditingIndex(null);
    console.log(formData.address);
  };
  return (
    <div className="container mt-5 mainBox">
      <form className="mt-3 mb-4 py-4">
        <div><h1 style={{color:"#ffffff"}}
        >Registration Form</h1></div>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter your name"
            id="exampleInputName"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
          />
          {formError.name && (
            <span className="error">Name should not be empty.</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDob" className="form-label">
            Date of birth
          </label>
          <input
            type="date"
            placeholder="Plese enter your dob"
            className="form-control"
            id="exampleInputdob"
            value={formData.dob}
            onChange={(e) => handleChange(e, "dob")}
          />
          {formError.dob && (
            <span className="error">Invalid Date of Birth.</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhn" className="form-label">
            Phone number
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Please enter number"
            id="exampleInputPhn"
            value={formData.phone}
            onChange={(e) => handleChange(e, "phone")}
          />
          {formError.phone && (
            <span className="error">
              Phone number cannot be blank, must be a number, and should have 8
              to 10 digits.
            </span>
          )}
        </div>
        <div>
          {formData.address.map((address, index) => (
            <div className="mb-3" key={index}>
              <div className="col-12">
                <label htmlFor={`inputAddress${index}`} className="form-label">
                  Address{index + 1}*
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter your address"
                  id={`inputAddress${index}`}
                  value={address}
                  onChange={(e) => handleChangeAddress(e, index)}
                />
                {formError.address && address.trim() === "" && (
                  <span className="error">Address field cannot be empty.</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="addressbtn" type="button" onClick={handleAddAddress}>
          Add Address
        </button>
        {formData.address.length > 1 && (
          <button  className="addressbtn" type="button" onClick={handleRemoveAddress}>
            Remove Address
          </button>
        )}

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="exampleInputPassword1"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
          />
          {formData.password && (
            <span className="error">
              Password must have a minimum length of 10 characters and contain
              at least one special character and one uppercase letter.
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputconfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-control"
            id="exampleInputconfirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e, "confirmPassword")}
          />
          {formData.confirmPassword && (
            <span className="error">Passwords do not match.</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
<div className="userlist">
<div className="card ">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sl.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Edit User</th>
              <th scope="col">Delete User</th>
            </tr>
          </thead>

          <>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.dob}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <button className="tablebtn" onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                  <td>
                    <button className="tablebtn"  onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </table>
      </div>
</div>
    
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { addUser, deleteUser })(Registration);
