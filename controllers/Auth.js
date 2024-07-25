import CustomerLogin from "../models/CustomerLoginModel.js";
import Customers from "../models/CustomersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    const { username, password } = req.body;
    const response = await CustomerLogin.findOne({
        include: [{ model: Customers }],
        where: [
            {
                username: username,
            },
        ],
    });
    if (response) {
        const match = await bcrypt.compare(password, response.password);
        if (match) {
            const payload = {
                id: response.id,
                uuid: response.uuid,
                username: username,
                role: response.role,
                customerId: response.customerId,
            };
            const token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
                expiresIn: "24h",
            });
            await CustomerLogin.update({ refresh_token: token }, { where: { id: response.id } });
            res.cookie('jwt',token, { httpOnly: true, maxAge: 3600000 });
            res.status(200).json(response);
        } else {    
            res.status(404).json({ msg: "Password not match" });
        }
    } else {
        res.status(404).json({ msg: "Username not found" });
    }
};

export const Lougout = async (req, res) => {
    let refresh_token = req.cookies['jwt'] === undefined ? "" : req.cookies['jwt'];
    if (refresh_token === "") {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const customerLogin = await CustomerLogin.findAll({
        where: [
            {
                refresh_token: refresh_token,
            },
        ],
    }); 
    const id = customerLogin[0].id;
    await CustomerLogin.update({ refresh_token: "" }, { where: { id: id } });
    res.clearCookie("jwt");
    return res.status(200).json({ msg: "You have been logged out." });
}

export const authorization = async (req, res, next) => {
    let tokenHeader = req.headers["authorization"] === undefined ? "" : req.headers["authorization"];
    if (tokenHeader === "") {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    let token = tokenHeader.split(" ")[1];
    console.log("token = " + token);

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        req.id = decoded.id;
        req.uuid = decoded.uuid;
        req.username = decoded.username;
        req.role = decoded.role;
        req.customerId = decoded.customerId;
        next();
    });
}

export const cookiesAuth = async (req, res) => {
    let refresh_token = req.cookies['jwt'] === undefined ? "" : req.cookies['jwt'];
    if (refresh_token === "") {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const response = await CustomerLogin.findOne({
        where: [
            {
                refresh_token: refresh_token,
            },
        ],
    });
    if (!response) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const payload = {
            id: decoded.id,
            uuid: decoded.uuid,
            username: decoded.username,
            role: decoded.role,
            customerId: decoded.customerId, 
        }
        const token = jwt.sign(payload, process.env.TOKEN_KEY, {
                expiresIn: "60s",
        });
        const data = {
            id: decoded.id,
            uuid: decoded.uuid,
            username: decoded.username,
            role: decoded.role,
            customerId: decoded.customerId,
            token: token,
        }
        res.status(200).json({data});
    });
}

export const isAdmin = async (req, res, next) => {
    if (req.role === "admin") {
        next();
    } else {
        return res.status(403).json({ msg: "Admin Only" });
    }
}