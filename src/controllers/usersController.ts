import { Request, Response } from 'express';
import { toEditorSettings } from 'typescript';

import pool from '../database'

class UsersController {

    public async list(req: Request, res: Response) {
        pool.query('select * from usuarios', (err, result) => {
            res.json(result)
        });

    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params;
        pool.query('select * from usuarios where id = ?', [id], (err, result) => {

            if (Array.isArray(result) && result.length > 0) {
                res.json(result)

            } else {

                res.status(404).json({ text: "The user doesn't exists" })
            }
        });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.promise().query('INSERT INTO usuarios set ?', [req.body]);
        res.json({ message: 'User saved' });
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('UPDATE usuarios set ? WHERE id =?', [req.body, id]);
        res.json({ message: 'User updated' });
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ message: 'User deleted' });
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.query;
        pool.query("SELECT * FROM usuarios u WHERE u.nombreUsuario LIKE ? AND u.password LIKE ?", [username, password], (err, result) => {
            if (Array.isArray(result) && result.length == 1) {
                res.status(200).json({ user: result[0] });
            } else {
                res.status(401).json({ error: "User or password incorrect" });
            }
        });
    }

}

export const usersController = new UsersController;