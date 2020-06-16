import express from "express";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {

    constructor() {
        super("api/notes");
        this.router
            .get("", this.getAll)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .post("", this.create)
            .delete(":/id", this.delete)
            .put("/:id", this.edit)
    }
    async getAll(req, res, next) {
        try {
            return res.send(["value1", "value2"]);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creator = req.user.email;
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            req.body.id = req.params.id;
            let data = await notesService.edit(req.body);
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let data = await notesService.delete(req.params.id);
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
}

