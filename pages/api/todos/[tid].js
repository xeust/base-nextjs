import { Deta } from 'deta';

const deta = Deta();

const base = deta.Base("todos");

export default async (req, res) => {

  let { body, method, query: { tid } } = req;
  let respBody = {};

  if (method === 'PUT') {

    body = JSON.parse(body);
    respBody = await base.put(body);
    res.statusCode = 200;

  } else if (method === 'DELETE') {

    respBody = await base.delete(tid);
    res.statusCode = 200;

  }

  res.json(respBody);
}