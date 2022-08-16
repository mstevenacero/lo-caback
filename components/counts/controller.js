import service from "./service.js";
const Service = new service();
import { v4 as uuidv4 } from "uuid";
// FUNCIONES  ASINCRONICAS

async function add(req, res, next) {
  // console.log("requets",req.body);
  try {
    let numerCount = uuidv4();
    let userCount = {
      id_user: req.body.id_user,
      number_count: numerCount,
      balance: req.body.balance,
    };
    const data = await Service.Create(userCount);
    return res
      .status(200)
      .send({ data: data, message: "creado usuario de en la base de datos " });
  } catch (e) {
    console.log("error-->", e);
    return res.status(500).send(e);
  }
}
//agregar balance

async function addBalance(req, res, next) {
  
  try {
    const dataOne = await Service.getOne({
      where: { number_count: req.body.number_count },
    });
  
    let balanceCurrent = dataOne.dataValues["balance"];
    let newBalance = parseInt(balanceCurrent) + parseInt(req.body.balance);
    let userNew = {
      id_user: dataOne.dataValues["id"],
      number_count: req.body.number_count,
      balance: newBalance,
    };
    const data = await Service.Update(
      { where: { number_count: req.body.number_count } },
      userNew
    );
    return res.status(200).send({ data: data, message: "nuevo saldo " });
  } catch (e) {
    console.log("error-->", e);
    return res.status(500).send(e);
  }
}
//sustraer balance

async function subtractBalance(req, res, next) {
 
  try {
    const dataOne = await Service.getOne({
      where: { number_count: req.body.number_count },
    });
    let balanceCurrent = dataOne.dataValues["balance"];
    let newBalance = parseInt(balanceCurrent) - parseInt(req.body.balance);
    let userNew = {
      id_user: dataOne.dataValues["id"],
      number_count: req.body.number_count,
      balance: newBalance,
    };
    const data = await Service.Update(
      { where: { number_count: req.body.number_count } },
      userNew
    );
    return res.status(200).send({ data: data, message: "nuevo saldo " });
  } catch (e) {
    console.log("error-->", e);
    return res.status(500).send(e);
  }
}

//en listar cuentas

async function list(req, res, next) {
 
  try {
    const data = await Service.showAll();
    return res
      .status(200)
      .send({ data: data, message: "lista de  usuarios en la base de datos" });
  } catch (e) {
    console.log("error -->:", e);
    return res.status(500).send(e);
  }
}

///   traer solo un balance
async function getOne(req, res, next) {
    // console.log("requets",req.body);
    try {
        const data = await Service.getOne({
            where: { number_count: req.params.number_count},
          });
      
      return res
        .status(200)
        .send({ data: data, message: "cuenta de usuario" });
    } catch (e) {
      console.log("error-->", e);
      return res.status(500).send(e);
    }
  }

export default {
  add,
  list,
  addBalance,
  subtractBalance,
  getOne
};
