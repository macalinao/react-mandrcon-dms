import faker from 'faker';
import moment from 'moment';

import db from '../lib/db';
import { Case, User } from '../lib/models';

db.connect();

let users = [];
for (let i = 0; i < 5; i++) {
  let name = faker.name.findName();
  let u = name.toLowerCase().split(' ');
  let uname = u[0].charAt(0) + u[1];

  users.push({
    username: uname,
    password: faker.internet.password(),
    name: name
  });
}

let cases = [];
for (let i = 0; i < 100; i++) {
  let dosA = faker.date.between('1/1/2010', '1/1/2014');
  let dosB = faker.date.between(dosA, '1/1/2014');
  let dos = moment(dosA).format('MM/DD/YYYY') + ' - ' + moment(dosB).format('MM/DD/YYYY');

  let ddA = faker.date.between('1/1/2010', '1/1/2014');
  let ddB = faker.date.between(ddA, '1/1/2014');
  let dd = moment(ddA).format('MM/DD/YYYY') + ' - ' + moment(ddB).format('MM/DD/YYYY');

  let id = faker.random.number(99999999).toString();

  cases.push({
    patientName: faker.name.findName(),
    patientId: id,
    datesOfService: dos,
    datesDenied: dd,
    denialReason: faker.lorem.sentence(),
    pages: faker.random.number(300),
    caseType: faker.company.companyName(),
    strength: faker.random.array_element(['Weak', 'Average', 'Strong']),
    file: id + '.pdf',
    body: faker.lorem.paragraphs()
  });
}

db.close();
