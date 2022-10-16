import { Request, Response, NextFunction } from "express";

export interface IExpressRequest extends Request {
  userId?: string;
  logObject?: any;
}

export interface IResponse extends Response {
  error?: (code: number, message: string) => Response;
  success?: (code: number, message: string, result: any) => Response
}

export interface IExpressResponse {
  status: number;
  data?: any;
}

