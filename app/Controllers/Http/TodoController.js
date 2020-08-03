'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use('App/Models/Todo');

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {

    /*
        This is an example of a resource controller, that takes advantage of the resource route function.
        We are only using a few of the resource controller functions as all of the crud actions can be done on one page.
    */

    async index ({ request, response, auth, view }) {
        let todos = await Todo.query().where('user_id', auth.user.id).orderBy('created_at', 'desc').fetch();
        return view.render('todo/index', {
            title: "todo",
            todos: todos.toJSON(),
        });
    }

    async create ({ request, response, view }) {
        return response.redirect('/todo', false, 301);
    }

    async store ({ request, auth, response }) {
        await Todo.create({
            user_id: auth.user.id,
            title: request.input('title')
        });

        return response.redirect('back');
    }

    async show ({ params, request, response, view }) {
        return response.redirect('/todo', false, 301);
    }

    async edit ({ params, request, response, view }) {
        return response.redirect('/todo', false, 301);
    }

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
