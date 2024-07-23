import Customers from "../models/CustomersModel.js";
import Users from "../models/UsersModel.js";
import CustomerLogin from "../models/CustomerLoginModel.js";
import bcrypt from "bcrypt";

export const getCustomers = async (req, res) => {
  let response;
  try {
    response = await Customers.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomer = async (req, res) => {
  let response;
  try {
    const { id } = req.params;
    response = await Customers.findOne({
      where: [
        {
          uuid: id, 
        },
      ],
    });
    // var tanggal = response.dataValues.createdAt;
    // var tgl = new Date(tanggal);  
    // console.log("Tanggal local "+tgl.toLocaleString());
    // console.log(response.dataValues.createdAt);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCustomer = async (req, res) => {
  let response;
  const { customer, pic, phone, address, status } = req.body;
  try {
    await Customers.create({
      customer: customer,
      pic: pic,
      phone: phone,
      address: address,
      status: status,
    });
    res.status(201).json({ msg: "Customer created!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  let response;
  const { id } = req.params;
  const { customer, pic, phone, address, status } = req.body;
  try {
    await Customers.update(
      {
        customer: customer,
        pic: pic,
        phone: phone,
        address: address,
        status: status,
      },
      { where: [{ uuid: id }] },
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({ msg: "Customer updated!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    await Customers.destroy({ where: [{ id: id }] });
    res.status(202).json({ msg: "Customer deleted!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserCustomers = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    response = await Customers.findOne({
      include: [{ model: Users }],
      where: [
        {
          uuid: id,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createLogin = async (req, res) => {
  const { username, password, role, customerId } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    await CustomerLogin.create({
      username: username,
      password: hashPassword,
      role: role,
      customerId: customerId,
    });
    res.status(201).json({ msg: "Login created!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
} 

export const getCustomerById = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    response = await Customers.findOne({
      where: [
        {
          id: id,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}