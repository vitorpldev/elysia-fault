import { expect, it, describe } from 'bun:test';
import { Elysia } from 'elysia';
import { elysiaFault } from '../src/handler';
import { ApiError, NotFound, Unauthorized, BadRequest } from '../src/helpers/errors';

describe('elysia-fault', () => {
  it('should be able to function without triggering errors', async () => {
    const response = await new Elysia()
      .use(elysiaFault())
      .get('/', () => 'Route not triggering an error')
      .handle(new Request('http://localhost/'));

    expect(response.status).toBe(200);
    expect(response.text()).resolves.toEqual('Route not triggering an error');
  });

  it('should be able to work with native errors', async () => {
    const response = await new Elysia()
      .use(elysiaFault())
      .get('/', () => 'Router Root')
      .handle(new Request('http://localhost/notfound'));

    expect(response.status).toBe(404);
    expect(response.json()).resolves.toEqual({
      message: 'GET http://localhost/notfound is not a valid endpoint.',
    });
  });

  it('should be able to return a custom 404 error', async () => {
    const response = await new Elysia()
      .use(elysiaFault())
      .get('/', () => {
        throw new NotFound('Route that should return a default 404');
      })
      .handle(new Request('http://localhost/'));

    expect(response.status).toBe(404);
    expect(response.json()).resolves.toEqual({
      name: 'NotFound',
      message: 'Route that should return a default 404',
    });
  });

  it('should be able to return a custom 401 error', async () => {
    const response = await new Elysia()
      .use(elysiaFault())
      .get('/', () => {
        throw new Unauthorized('Route that should return a default 401 Unauthorized');
      })
      .handle(new Request('http://localhost/'));

    expect(response.status).toBe(401);
    expect(response.json()).resolves.toEqual({
      name: 'Unauthorized',
      message: 'Route that should return a default 401 Unauthorized',
    });
  });

  it('should be able to return a create custom error', async () => {
    class MyCustomError extends ApiError {
      constructor(message: string) {
        super(message, 500, 'MyCustomError');
      }
    }

    const response = await new Elysia()
      .use(elysiaFault())
      .get('/', () => {
        throw new MyCustomError('Custom error built by myself');
      })
      .handle(new Request('http://localhost/'));

    expect(response.status).toBe(500);
    expect(response.json()).resolves.toEqual({
      name: 'MyCustomError',
      message: 'Custom error built by myself',
    });
  });

  it('should be able to customize standard errors in json format', async () => {
    const response = await new Elysia()
      .use(
        elysiaFault({
          found: (err) => ({ message: `Customize error not found in router ${err.url}` }),
        })
      )
      .get('/', () => 'Router Root')
      .handle(new Request('http://localhost/notfound'));

    expect(response.status).toBe(404);
    expect(response.json()).resolves.toEqual({
      message: 'Customize error not found in router http://localhost/notfound',
    });
  });

  it('should be able to customize standard errors in text format', async () => {
    const response = await new Elysia()
      .use(
        elysiaFault({
          found: (err) => `Customize error not found in router ${err.url}`,
        })
      )
      .get('/', () => 'Router Root')
      .handle(new Request('http://localhost/notfound'));

    expect(response.status).toBe(404);
    expect(response.text()).resolves.toEqual(
      'Customize error not found in router http://localhost/notfound'
    );
  });

  it('should be able to customize custom errors in text format', async () => {
    const response = await new Elysia()
      .use(
        elysiaFault({
          config: (err) => err.message,
        })
      )
      .get('/', () => {
        throw new BadRequest('Testing in bad request error with only text');
      })
      .handle(new Request('http://localhost/'));

    expect(response.status).toBe(400);
    expect(response.text()).resolves.toEqual('Testing in bad request error with only text');
  });
});
