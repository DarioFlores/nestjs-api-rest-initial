import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const url = context.getArgByIndex(1).req.url;
    const method = context.getArgByIndex(1).req.method;
    const host = context.getArgByIndex(1).req.headers.host;
    const protocol = context.getType();
    const endpoint = `${protocol}://${host}${url}`;
    const controller = context.getClass().name;
    return next.handle().pipe(
      catchError(err => throwError(new HttpException({
          method,
          endpoint,
          statusCode: err.response.statusCode,
          controller,
          errors: {
            message: err.response.message,
            description: err.response.error
          },
          data: null,
        }, err.response.statusCode))
      ),
      map(data => ({
        method,
        endpoint,
        statusCode: context.getArgByIndex(1).statusCode,
        controller,
        errors: null,
        data,
      }))
    );
  }
}