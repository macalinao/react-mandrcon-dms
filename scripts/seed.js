import P from 'bluebird';
import faker from 'faker';
import moment from 'moment';

import db from '../lib/db';
import { Case, User } from '../lib/models';

const USERS = 10;
const ADMINS = 2;
const CASES = 250;

function clearDB() {
  return Case.remove({}).then(() => {
    return User.remove({});
  });
}

function createUsers() {
  let users = [];
  for (let i = 0; i < USERS; i++) {
    let name = faker.name.findName();
    let u = name.toLowerCase().split(' ');
    let uname = u[0].charAt(0) + u[1];

    users.push({
      username: uname,
      password: faker.internet.password(),
      name: name
    });
  }

  return P.map(users, (doc) => {
    let user = new User(doc);
    return user.hashPassword().then(() => {
      return user.save();
    });
  });
}

function createAdmins(users) {
  let admins = [];
  for (let i = 0; i < ADMINS; i++) {
    let name = faker.name.findName();
    let u = name.toLowerCase().split(' ');
    let uname = u[0].charAt(0) + u[1];

    admins.push({
      username: uname,
      password: 'admin',
      name: name,
      admin: true
    });
  }

  return P.map(admins, (doc) => {
    let user = new User(doc);
    return user.hashPassword().then(() => {
      return user.save();
    });
  }).then((admins) => {
    return [users, admins];
  });
}

function createCases(users, admins) {
  let cases = [];
  for (let i = 0; i < CASES; i++) {
    let dosA = faker.date.between('1/1/2010', '1/1/2014');
    let dosB = faker.date.between(dosA, '1/1/2014');
    let dos = moment(dosA).format('MM/DD/YYYY') + ' - ' + moment(dosB).format('MM/DD/YYYY');

    let ddA = faker.date.between('1/1/2010', '1/1/2014');
    let ddB = faker.date.between(ddA, '1/1/2014');
    let dd = moment(ddA).format('MM/DD/YYYY') + ' - ' + moment(ddB).format('MM/DD/YYYY');

    let id = faker.random.number(99999999).toString();

    let c = {
      patientName: faker.name.findName(),
      patientId: id,
      datesOfService: dos,
      datesDenied: dd,
      denialReason: faker.lorem.sentence(),
      pages: faker.random.number(300),
      caseType: faker.random.array_element(['MedSurg', 'OB', 'NICU', 'PSYCH', 'Readmit']),
      strength: faker.random.array_element(['Weak', 'Average', 'Strong']),
      file: id + '.pdf'
    };

    cases.push(c);

    // 75% assigned
    if (faker.random.number(100) < 25) {
      continue;
    }

    c.assignedTo = faker.random.array_element(users)._id;
    c.dateAssigned = faker.date.between('1/1/2014', '1/1/2015');
    c.assignedBy = faker.random.array_element(admins)._id;

    // 50% submitted
    if (faker.random.number(100) < 50) {
      continue;
    }

    c.body = faker.lorem.paragraphs();
    c.dateSubmitted = faker.date.between(c.dateAssigned, '1/1/2015');

    // 50% reviewed
    if (faker.random.number(100) < 50) {
      continue;
    }

    c.reviewedBy = faker.random.array_element(admins)._id;
    c.dateReviewed = faker.date.between(c.dateSubmitted, '1/1/2015');
  }

  return P.map(cases, (doc) => {
    return (new Case(doc)).save();
  }).then((cases) => {
    return [users, admins, cases];
  });
}

// Database stuff
console.log('Connecting to database...');
db.connect();
console.log('Seeding database...');
clearDB().then(createUsers).then(createAdmins).spread(createCases)
  .spread((users, admins, cases) => {
    db.close();
    console.log('Database seeded with the following:');
    console.log('Users: ' + users.length);
    console.log('Admins: ' + admins.length);
    console.log('Cases: ' + cases.length);
    console.log('Sample admin: ');
    console.log('  Username: ' + faker.random.array_element(admins).username);
    console.log('  Password: admin');
  });
