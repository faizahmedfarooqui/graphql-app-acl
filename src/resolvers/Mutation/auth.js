const bcrypt = require('bcryptjs')
const { getUserId } = require('./../../utils')
const jwt = require('jsonwebtoken')

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async updatePassword(parent, { oldPassword, newPassword, userId }, ctx, info) {
    if (! userId) {
      // a user updates their own password
      const _userId = getUserId(ctx);

      const user = await ctx.db.query.user({ where: { id: _userId } })
      const oldPasswordValid = await bcrypt.compare(oldPassword, user.password)
      if (! oldPasswordValid) {
        throw new Error('Old password was wrong, please try again!')
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 10)
      try {
        await ctx.db.mutation.updateUser({
          where: { id: user.id },
          data: { password: newPasswordHash },
        })
      } catch (e) {
        return e
      }
      return user;
    } else {
      // a user updates the password of another user -> must be an admin
      const requestingUserId = getUserId(ctx)
      const userIsAdmin = ctx.db.exists.User({
        id: requestingUserId,
        role: 'ADMIN',
      })
      const user = await ctx.db.query.user({ where: { id: userId } })
      const newPasswordHash = await bcrypt.hash(newPassword, 10)
      try {
        await ctx.db.mutation.updateUser({
          where: { id: userId },
          data: { password: newPasswordHash },
        })
      } catch (e) {
        return e
      }
      return user
    }
  },
}

module.exports = { auth }
