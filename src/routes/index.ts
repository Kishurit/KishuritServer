import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import dbRouter from "./dbRoutes";
import mailRouter from "./mailRoutes";
const globalRouter: express.Router = express.Router();

globalRouter.use(function (req: Request, res: Response, next: NextFunction) {
  if (
    (//req.method.toUpperCase() === "GET" ||
      req.method.toUpperCase() === "POST" ||
      req.method.toUpperCase() === "PUT" ||
      req.method.toUpperCase() === "DELETE") &&
    req.body.key !== process.env.API_KEY
  )
    res.status(404).json(null);
  else next();
});

const routes = [globalRouter, dbRouter, mailRouter, router];

export default routes;
