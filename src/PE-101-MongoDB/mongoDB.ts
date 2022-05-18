/* eslint-disable max-len */
import express from 'express';
import './mongoose';
import {Athlete} from './athlete';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/athlete', (req, res) => {
  const athlete = new Athlete(req.body);

  athlete.save().then((athlete: any) => {
    res.status(201).send(athlete);
  }).catch((error: any) => {
    res.status(400).send(error);
  });
});

app.get('/athlete', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Athlete.find(filter).then((athlete: any) => {
      if (athlete.length !== 0) {
        res.send(athlete);
      } else {
        res.status(404).send();
      }
    }).catch(() => {
      res.status(500).send();
    });
  }
});

app.patch('/athlete', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'surname'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Athlete.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((athlete: any) => {
        if (!athlete) {
          res.status(404).send();
        } else {
          res.send(athlete);
        }
      }).catch((error: any) => {
        res.status(400).send(error);
      });
    }
  }
});

app.delete('/athlete', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Athlete.findOneAndDelete({name: req.query.name.toString()}).then((athlete) => {
      if (!athlete) {
        res.status(404).send();
      } else {
        res.send(athlete);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});

app.all('*', (_, res) => {
  res.status(501).send();
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
