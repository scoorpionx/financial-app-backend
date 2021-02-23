'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const record = (data) => {
    return {
        _id: data._id,
        value: data.value,
        due_date: data.due_date,
        reference: {
            _id: data.reference._id,
            name: data.reference.name,
            description: data.reference.description,
            __v: data.reference.__v,
        },
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        __v: data.__v
    }
}

module.exports = {
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }

        const data = await strapi.services.records.find({ user: { _id: user.id } });

        if (!data) {
            return ctx.notFound();
        }

        const transformedData = data.map(item => record(item))
        ctx.send(transformedData);
    },

    async findOne(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.records.find({
            user: user.id,
            _id: ctx.params.id
        });

        ctx.send(data);
    },

    async count(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.records.count({ user: { _id: user.id } });

        ctx.send(data);
    },

    async create(ctx) {
        const req = ctx.request.body

        const user = ctx.state.user;

        const data = await strapi.services.records.create({ ...req, user: user.id });

        ctx.send(data);
    },

    async delete(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.records.delete({
            user: user.id,
            _id: ctx.params.id
        });

        ctx.send(data);
    },

    async update(ctx) {
        const user = ctx.state.user;

        const data = await strapi.services.records.update({
            user: user.id,
            _id: ctx.params.id
        }, ctx.request.body);

        ctx.send(data);
    }
};

