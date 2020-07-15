import express from "express"
import * as bodyParser from "body-parser"
import { NextFunction, Request, Response } from "express"

async function mountRoutesForNotFound(req: Request, res: Response, next: NextFunction) {
  await res.send("404 Not Found")
}

export class App {
  public expressInstance: express.Application

  constructor() {
    this.expressInstance = express()
    this.initConfig()
  }

  private initConfig() {
    this.expressInstance.use(bodyParser.urlencoded({extended: true}))
    this.expressInstance.use(bodyParser.json())
    this.mountRoutes()
  }

  private mountRoutes() {
    this.expressInstance.get("/", async (req, res, next) => {
      await res.send("Hello Express")
    })
    this.expressInstance.get("*", mountRoutesForNotFound)
  }
}
