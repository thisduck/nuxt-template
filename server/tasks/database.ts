import User from '../models/user';

const tasks = {
  insert: async () => {
    await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
    });
  },
  find: async () => {
    const users = await User.findAll();
    return users;
  },
  update: async () => {
    const user = await User.findOne({
      where: {
        email: 'john@doe.com',
      },
    });
    if (user) {
      user.name = 'Jane Doe';
      await user.save();
    }
  },
};

export default tasks;
