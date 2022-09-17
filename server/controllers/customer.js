import Customer from "../models/customer.js";
import Address from "../models/address.js";

export const getCustomerData = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  const customer = await Customer.findOne({ phoneNumber }).populate(
    "addresses"
  );
  if (!customer) {
    return res.status(400).json("Customer Not Found");
  } else return res.status(200).json(customer);
};
export const createCustomer = async (req, res) => {
  const { name, phoneNumber, email, coc, addresses } = req.body;
  let allAddresses = [];
  for (let i = 0; i < addresses.length; i++) {
    const newAddress = await Address.create({
      fullAddress: addresses[i].fullAddress,
      town: addresses[i].town,
      city: addresses[i].city,
      state: addresses[i].state,
      pinCode: addresses[i].pinCode,
    });
    allAddresses.push(newAddress._id);
  }

  const customer = await Customer.create({
    name,
    phoneNumber,
    email,
    coc,
    addresses: allAddresses,
  });
  return res.status(200).json("Customer Created");
};
export const updateCustomer = async (req, res) => {
  const { name, phoneNumber, email, coc, addresses } = req.body;
  console.log(name, phoneNumber);
  const customer = await Customer.findOne({ phoneNumber });
  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i]._id === undefined) {
      const newAddress = await Address.create({
        fullAddress: addresses[i].fullAddress,
        town: addresses[i].town,
        city: addresses[i].city,
        state: addresses[i].state,
        pinCode: addresses[i].pinCode,
      });
      customer.addresses.push(newAddress._id);
    }
  }
  if (name !== customer.name) {
    customer.name = name;
  }
  if (coc !== customer.coc) {
    customer.coc = coc;
  }
  if (email !== customer.email) {
    customer.email = email;
  }

  await customer.save();

  return res.status(200).json("Customer Created");
};
