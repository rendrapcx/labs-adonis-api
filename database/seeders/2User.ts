import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'admin',
        email: 'admin@mail.com',
        password: 'password',
        roleId: 2
      },
      {
        username: 'user1',
        email: 'user1@mail.com',
        password: 'password',
        roleId: 1
      },
      {
        username: 'user2',
        email: 'user2@mail.com',
        password: 'password',
        roleId: 1
      }
    ])
  }
}
