import { db } from '../environment/kysely';

const tasks = {
  insert: async () => {
    const result = await db.transaction().execute(async (tx) => {
      const user = await tx.insertInto('users').values({
        name: 'Some Dude',
        email: 'lala@lala.com',
      }).returningAll().executeTakeFirstOrThrow();

      // eslint-disable-next-line no-console
      console.log('User inserted:', user);

      return user;
    });

    return result;
  },
  findAll: async () => {
    const users = await db.selectFrom('users').selectAll().execute();
    return users;
  },
  findById: async (id: number) => {
    const user = await db.selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  },
  update: async () => {
    const user = await db.selectFrom('users').where('email', '=', 'lala@lala.com').selectAll().executeTakeFirst();

    if (user) {
      const updatedUser = await db.updateTable('users')
        .set({
          name: 'Updated Dude',
          email: 'hello@example.com',
        })
        .where('id', '=', user.id)
        .returningAll()
        .executeTakeFirstOrThrow();

      // eslint-disable-next-line no-console
      console.log('User updated:', updatedUser);
    }
  },
};

export default tasks;
