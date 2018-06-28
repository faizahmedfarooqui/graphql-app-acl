const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const requestingUserIsAuthor = ctx.db.exists.Post({
      id,
      author: {
        id: userId,
      },
    })
    const requestingUserIsAdmin = ctx.db.exists.User({
      id: userId,
      role: 'ADMIN',
    })

    if (requestingUserIsAdmin || requestingUserIsAuthor) {
      return ctx.db.query.post({ where: { id } }, info)
    }
    throw new Error(
      'Invalid permissions, you must be an admin or the author of this post to retrieve it.',
    )
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
