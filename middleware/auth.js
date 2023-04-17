import jwt from "jsonwebtoken";
// import Admin from "../Models/AdminModel.js";

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Token Unavailable" });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req[decoded.type] = decoded;
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Token is invalid", error: error.message });
    }
};

export default verifyToken;

export const verifyAdmin = async (req, res, next) => {
    if (!req.admin) {
        return res.status(403).json({ message: "Not an Admin" });
    }
    req.admin = await Admin.findById(req.admin._id);
    next();
};

export const verifySuper = (req, res, next) => {
    if (!req.admin.isSuper) {
        return res.status(403).json({ message: "Not a Super Admin" });
    }
    next();
};

// export const verifyUser = (req, res, next) => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     return next();
// };
