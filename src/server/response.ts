import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export {
  sendOK,
  sendFile,
  endpointNotFound,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendMethodNotAllowed,
};

/////////////////////////

function destroySession(req: Request, res: Response) {
  req.session!.destroy(() => null);
}

/*
* Sends status 200: OK - Good request with response
*/
function sendOK(res: Response, data: any): void {
  res.status(HttpStatus.OK).send(data).end();
}

/*
* Sends file to client
*/
function sendFile(res: Response, pathToFile: string, fileName: string): void {
  res.download(pathToFile, fileName, (err) => {
    if (err) {
      console.log('send file err: ', err);
    }
    console.log('file sent to client');
  });
}

/*
* Sends 404
*/
function endpointNotFound(req: Request, res: Response, next: NextFunction): void {
  sendMethodNotAllowed(req, res, 'API endpoint not found');
}

/*
* Sends out response
*/
function _send400(res: Response, data: any): void {
  res.status(data.status).send(data).end();
}

/*
* Sends status 400: Bad Request
*/
function sendBadRequest(req: Request, res: Response, err: Error | string): void {
  const message = typeof err === 'string' ? err : err && err.message;
  _send400(res, {
    description: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    status: HttpStatus.BAD_REQUEST,
    message,
    url: req.url
  });
}

/*
* Sends status 401: Unauthorized
*/
function sendUnauthorized(req: Request, res: Response, message: string) {
  destroySession(req, res);
  _send400(res, {
    description: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
    status: HttpStatus.UNAUTHORIZED,
    message,
    url: req.url
  });
}

/*
* Sends status 403: Forbidden - Crazy Unauthorized
*/
function sendForbidden(req: Request, res: Response, message: string): void {
  destroySession(req, res);
  _send400(res, {
    description: HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
    status: HttpStatus.FORBIDDEN,
    message,
    url: req.url
  });
}

/*
* Sends status 404: Not Found - Resource / File not here
*/
function sendNotFound(req: Request, res: Response, message: string): void {
  _send400(res, {
    description: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    status: HttpStatus.NOT_FOUND,
    message,
    url: req.url
  });
}

/*
* Sends status 405: Method Not Allowed / Missing Endpoint
*/
function sendMethodNotAllowed(req: Request, res: Response, message: string): void {
  _send400(res, {
    description: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
    status: HttpStatus.METHOD_NOT_ALLOWED,
    message,
    url: req.url
  });
}
