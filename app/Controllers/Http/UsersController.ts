import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response, auth }: HttpContextContract) {
    const welcome = 'Welcome, ' + auth.user!.username
    return response.json(welcome)
  }

  public async login({ request, auth }: HttpContextContract) {
    const { username, email, password } = request.only(['username', 'email', 'password'])
    try {
      let token = {}
      token = await auth.use('api').attempt(email || username, password, { expiresIn: '1days' })
      const roleId = auth.user?.roleId
      token = { ...token, roles: roleId }
      return token
    } catch (error) {
      return { error }
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { Revoke: true }
  }

  public async register({ request }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true })
      ]),
      email: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
        rules.email()]),
      password: schema.string({}, [rules.maxLength(8)])
    })

    // validate & save
    try {
      await User.create(await request.validate({ schema: userSchema }))
      return { INFO: 'Register Success...' }
    } catch (error) {
      return { error }
    }
  }
}
