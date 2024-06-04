import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Keep-Alive');

    next();
  }
}
