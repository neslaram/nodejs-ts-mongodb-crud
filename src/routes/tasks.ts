import { Router, Request, Response } from 'express';
import Task from '../models/Task';

const router = Router();
router
  .route('/create')
  .get(renderCreateTask)
  .post(createTask);

router.route('/list').get(renderTaskList);

router.route('/delete/:id').get(deleteTask);

router
  .route('/edit/:id')
  .get(renderEditTask)
  .post(editTask);

function renderCreateTask(req: Request, res: Response) {
  res.render('tasks/create');
}

async function createTask(req: Request, res: Response) {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.redirect('/tasks/list');
}

async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect('/tasks/list');
}

async function editTask(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(id, { title, description });
  res.redirect('/tasks/list');
}

async function renderEditTask(req: Request, res: Response) {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('tasks/edit', { task });
}

async function renderTaskList(req: Request, res: Response) {
  const tasks = await Task.find();
  res.render('tasks/list', { tasks });
}

export default router;
