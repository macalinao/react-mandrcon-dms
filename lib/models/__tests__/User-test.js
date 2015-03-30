jest.autoMockOff();

import P from 'bluebird';
import { User } from '../User';

describe('User', () => {

  pit('should hash the password properly', () => {

    let tom = new User({
      username: 'Tom',
      password: 'asdf'
    });

    return tom.hashPassword().then(() => {
      return tom.comparePassword('asdf');
    }).then((res) => {
      expect(res).toBe(true);
      return tom.comparePassword('asdfg');
    }).then((res) => {
      expect(res).toBe(false);
    });

  });

});
