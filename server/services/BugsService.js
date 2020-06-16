import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {

    async find(query = {}) {
        let bugs = await dbContext.Bugs.find(query).populate(
            "creator",
            "name picture"
        );
        return bugs;
    }
    async findById(id) {
        let data = await dbContext.Bugs.findById(id).populate(
            "creator",
            "name picture"
        );
        if (!data) {
            throw new BadRequest("Invalid Id")
        }
        return data;
    }

    async create(rawData) {
        let data = await dbContext.Bugs.create(rawData)
        return data
    }
    async edit(update) {
        let data = await dbContext.Bugs.findByIdAndUpdate(update.id, update)
        return data
    }
    async delete(update) {
        let data = await dbContext.Bugs.findByIdAndUpdate(update.id, update)
        return data
    }

}

export const bugsService = new BugsService();