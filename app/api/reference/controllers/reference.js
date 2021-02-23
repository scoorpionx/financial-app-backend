'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const reference = (data) => {
    return {
        _id: data._id,
        name: data.name,
        description: data.description,
        published_at: data.published_at,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        __v: data.__v,
    }
}
module.exports = {
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }

        const data = await strapi.services.reference.find({ user: { _id: user.id } });

        if (!data) {
            return ctx.notFound();
        }

        const transformedData = data.map(item => reference(item))

        ctx.send(transformedData);
    },

    async findOne(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.reference.find({
            user: user.id,
            _id: ctx.params.id
        });

        ctx.send(data);
    },

    async count(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.reference.count({ user: { _id: user.id } });

        ctx.send(data);
    },

    async create(ctx) {
        const req = ctx.request.body

        const user = ctx.state.user;

        const data = await strapi.services.reference.create({ ...req, user: user.id });

        ctx.send(data);
    },

    async delete(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.reference.delete({
            user: user.id,
            _id: ctx.params.id
        });

        ctx.send(data);
    },

    async update(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.reference.update({
            user: user.id,
            _id: ctx.params.id
        }, ctx.request.body);

        ctx.send(data);
    }
};
