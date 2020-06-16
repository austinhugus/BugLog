import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {

    async findAll(query = {}) {
        let notes = await dbContext.Notes.find(query).populate(
            "creator",
            "name picture"
        );
        return notes;
    }
    async findById(id) {
        let note = await dbContext.Notes.findById(id);
        if (!note) {
            throw new BadRequest("Invalid Id");
        }
        return note;
    }
    async edit(update) {
        let data = await dbContext.Notes.findByIdAndUpdate(update.id, update)
        return data
    }
    async delete(id) {
        let data = await dbContext.Notes.findByIdAndDelete(id);
        if (!data) {
            throw new BadRequest("Invalid Id")
        }
    }
}

export const notesService = new NotesService();