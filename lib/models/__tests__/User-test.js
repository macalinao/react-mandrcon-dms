jest.autoMockOff();

import { User } from '../User';

describe('User', () => {

  it('should hash the password properly', () => {
    let tom = new User({
      username: 'Tom',
      password: 'asdf'
    });

    tom.save();

    tom.comparePassword('asdf').then((res) => {
      console.log(res);
    });

  });

});
