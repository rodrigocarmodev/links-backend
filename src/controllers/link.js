const express = require('express');
const { Link } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const accountId = 1;
  const links = await Link.findAll({ where: { accountId } });
  return res.jsonOK(links);
});

router.post('/', async (req, res) => {
  const accountId = 1;
  const { label, url, isSocial } = req.body;
  const image = 'http://google.com.br/image.png';

  const link = await Link.create({ label, url, isSocial, image, accountId });

  return res.jsonOK(link);
});

router.put('/:id', async (req, res) => {
  const accountId = 1;
  const { id } = req.params;
  const { body } = req;
  const fields = ['label', 'url', 'isSocial'];

  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound();

  fields.map((fieldname) => {
    const newValue = body[fieldname];
    if (newValue != undefined) link[fieldname] = newValue;
  });

  await link.save();

  return res.jsonOK(link);
});

router.get('/:id', async (req, res) => {
  const accountId = 1;
  const { id } = req.params;
  const link = await Link.findOne({ where: { id, accountId } });
  if (!link) return res.jsonNotFound();
  return res.jsonOK(link);
});

router.delete('/:id', async (req, res) => {
  const accountId = 1;
  const { id } = req.params;
  const link = await Link.findOne({ where: { id, accountId } });
  if (!link) return res.jsonNotFound();
  await link.destroy();
  return res.jsonOK(link);
});

module.exports = router;
