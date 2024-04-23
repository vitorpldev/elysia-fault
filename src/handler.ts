import { Elysia, NotFoundError, ValidationError } from 'elysia';
import { ApiError } from './helpers/errors';

interface IConfig {
  title: string;
  message: string;
}

interface IValidarion {
  url: string;
  schema: {
    path: string;
    message: string;
  }[];
  status: number;
}

interface INotFound {
  method: string;
  url: string;
}

interface IElysiaFault {
  config?: (err: IConfig) => string | object;
  found?: (err: INotFound) => string | object;
  validation?: (err: IValidarion) => string | object;
}

export function elysiaFault(props: IElysiaFault = {}) {
  return new Elysia({ name: 'elysia-fault' })
    .error({ API_ERROR: ApiError })
    .onError({ as: 'global' }, ({ error, request, set }) => {
      if (error instanceof NotFoundError) {
        if (props.found) {
          const responseData = props.found({ method: request.method, url: request.url });
          if (typeof responseData == 'string') {
            return new Response(responseData, { status: 404, headers: set.headers });
          }
          return Response.json(responseData, { status: 404, headers: set.headers });
        }

        return Response.json(
          {
            message:
              error.message !== 'NOT_FOUND'
                ? error.message
                : `${request.method} ${request.url} is not a valid endpoint.`,
          },
          {
            status: 404,
            headers: set.headers,
          }
        );
      }

      if (error instanceof ValidationError) {
        if (props.validation) {
          const responseData = props.validation({
            url: request.url,
            schema: error.all.map((err) => ({ path: err.path, message: err.message })),
            status: error.status,
          });
          if (typeof responseData == 'string') {
            return new Response(responseData, { status: 404, headers: set.headers });
          }
          return Response.json(responseData, { status: 404, headers: set.headers });
        }

        return Response.json(
          {
            message: `Validation error at url ${request.url} with the following parameters`,
            parameters: error.all.map((err) => ({ path: err.path, message: err.message })),
          },
          { status: error.status, headers: set.headers }
        );
      }

      if (error instanceof ApiError) {
        if (props.config) {
          const responseData = props.config({ title: error.title, message: error.message });
          if (typeof responseData == 'string') {
            return new Response(responseData, { status: error.status, headers: set.headers });
          }
          return Response.json(responseData, { status: error.status, headers: set.headers });
        }

        return Response.json(
          {
            name: error.title,
            message: error.message,
          },
          {
            status: error.status,
            headers: set.headers,
          }
        );
      }

      return error;
    });
}
