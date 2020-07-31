'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use('App/Models/Todo');

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index ({ request, response, auth, view }) {
        const todos = await Todo.query().where('user_id', auth.user.id).fetch()
        return view.render('todo/index', {
            title: "todo",
            todos: todos.toJSON(),
        });
    }

  /**
   * Render a form to be used for creating a new todo.
   * GET todos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async create ({ request, response, view }) {

    }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async store ({ request, auth, response }) {
        await Todo.create({
            user_id: auth.user.id,
            title: request.input('title')
        });

        return response.redirect('back');
    }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async show ({ params, request, response, view }) {
        return view.render('todo/show', {title: "todo"});
    }

  /**
   * Render a form to update an existing todo.
   * GET todos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async edit ({ params, request, response, view }) {
        return view.render('todo/edit', {title: "todo"});
    }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update ({ params, request, auth, response }) {
        const todo = await Todo.findOrFail(params.id);

        if (auth.user.id !== todo.user_id) {
            return 'You do not have permission to do this';
        }

        if (todo.completed) {
            todo.completed = false;
        } else {
            todo.completed = true;
        }

        await todo.save();

        return response.redirect('back');
    }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async destroy ({ params, request, auth, response }) {
        const todo = await Todo.findOrFail(params.id)

        if (auth.user.id !== todo.user_id) {
            return 'You do not have permission to do this'
        }

        await todo.delete();

        return response.redirect('back');
    }
}

module.exports = TodoController
