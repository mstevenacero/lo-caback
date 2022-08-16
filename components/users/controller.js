import service from "./service.js";
import counts from "../counts/service.js";
import encrypt from "../../services/encrypt.js";
import { v4 as uuidv4 } from "uuid";
import jwtService from "../../services/jwtService.js";
const Service = new service();
let Counts = new counts();
// FUNCIONES  ASINCRONICAS

async function add(req, res, next) {
  let key = await encrypt.encrypted(String(req.body.password));
  try {
    let user = {
      name: req.body.name,
      identification_card: req.body.identification_card,
      phone: req.body.phone,
      password: key,
    };
    const data = await Service.Create(user);
    const dataTwo = await Service.getOne({
      where: { identification_card: req.body.identification_card },
    });
    let userId = dataTwo.dataValues["id"];
    let numerCount = uuidv4();
    let count = {
      id_user: userId,
      number_count: numerCount,
      balance: req.body.balance,
    };
    Counts.Create(count);
    return res
      .status(200)
      .send({ data: data, message: "creado usuario de en la base de datos " });
  } catch (e) {
    console.log("error-->", e);
    return res.status(500).send(e);
  }
}

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

async function autentication(req, res, next) {
  try {
    const user = await Service.getOne({
      where: { identification_card: req.body.identification_card },
    });
    if (!user.dataValues) {
      return res.status(500).send({ message: "no se encontro usuario" });
    }
    let passOne = String(req.body.password);
    let passHash = user.dataValues["password"];
    let comparePass = await encrypt.compare(passOne, passHash);
    if (comparePass) {
      let tokenReturn = await jwtService.generateToken(comparePass);
      return res
        .status(200)
        .send({ data: user, token: tokenReturn, message: "datos del usuario" });
    }
    if (!comparePass) {
      return res.status(500).send({ message: "contraseña incorrecta" });
    }
  } catch (e) {
    console.log("error -->:", e);
    return res.status(500).send(e);
  }
}
async function getOne(req, res, next) {
  // console.log("requets",req.body);
  try {
    const data = await Service.getOne({
      where: { identification_card: req.params.identification_card },
    });

    return res.status(200).send({ data: data, message: "cuenta de usuario" });
  } catch (e) {
    console.log("error-->", e);
    return res.status(500).send(e);
  }
}

export default {
  add,
  list,
  autentication,
  getOne,
};
