// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Deta } from 'deta';

const deta = Deta('');

const base = deta.Base('todos');

export default async (req, res) => {
  // const response = await base.put("yo");
  // console.log(response);
  let { body, method } = req;
  let respBody = {};
  if (method === 'GET') {
    const {value: items} = await base.fetch([]).next();
    respBody = items;
  } else if (method === 'POST') {
    body = JSON.parse(body);
    body.isCompleted = false;
    respBody = await base.put(body);
  } 
  res.statusCode = 200;
  res.json(respBody);
}
