import { Response } from "express";

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export class HttpResponse {
  Ok(res: Response, data: string | null) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Succes",
      data: data
    });
  }

  Created(res: Response, data: string) {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      statusMsg: "Created",
      data: data
    });
  }

  BadRequest(res: Response, data: string) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMsg: "Bad Request",
      error: data
    });
  }

  Unauthorized(res: Response, data: string) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      error: data
    });
  }

  NotFound(res: Response, data: string) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      error: data
    });
  }

  Conflict(res: Response, data: string) {
    return res.status(HttpStatus.CONFLICT).json({
      status: HttpStatus.CONFLICT,
      statusMsg: "Conflict",
      error: data
    });
  }

  Error(res: Response, error: unknown) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal Server Error",
      error: error
    });
  }
}
