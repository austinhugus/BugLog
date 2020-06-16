import express from "express";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";

export class BugsController extends BaseController {

    constructor() {
        super("api/bugs");
        this.router
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .get('', this.getAll)
            .use(auth0Provider.getAuthorizedUserInfo)
            .get('/:id', this.getById)
            .get('/:id/notes', this.getNotesByBugId)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete);
    }
    async getAll(req, res, next) {
        try {
            let data = await bugsService.find(req.query)
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            let data = await bugsService.findById(req.params.id)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async getNotesByBugId(req, res, next) {
        try {
            let data = await bugsService.find({ bugId: req.params.id })
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await bugsService.create(req.body)
            return res.status(201).send(data);
        } catch (error) {
            next(error);
        }
    }

    async edit(res, req, next) {
        try {
            let data = await bugsService.edit(req.body)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            let update = {
                id: req.params.id,
                closed: true
            }
            await bugsService.delete(update);
            return res.send("Report Closed")
        } catch (error) {
            next(error)
        }
    }
}
