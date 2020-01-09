import {APIGatewayProxyHandler} from "aws-lambda";
import {Responses} from "../../libs/responses";
import {notesRepository} from "../../libs/notesRepository";
import {Note, NoteBody} from "../../libs/note";
import {Requests} from "../../libs/requests";

export const createNote: APIGatewayProxyHandler = async (event, _context) => {
    const noteBody = <NoteBody>Requests.body(event);
    const note = await notesRepository.createNote(noteBody);
    return Responses.success(note);
}

export const listNotes: APIGatewayProxyHandler = async (_event, _context) => {
    const notes = await notesRepository.listNotes();
    return Responses.success(notes);
}

export const getNote: APIGatewayProxyHandler = async (event, _context) => {
    const uuid = event.pathParameters['uuid'];
    const note = await notesRepository.getNote(uuid);
    return Responses.success(note);
}

export const updateNote: APIGatewayProxyHandler = async (event, _context) => {
    const uuid = event.pathParameters['uuid'];
    const note = <Note>Requests.body(event);
    if(uuid !== note.uuid) {
        return Responses.error(409, `UUID in body and on request path did not match.`);
    }
    const updatedNote = await notesRepository.putNote(note);
    return Responses.success(updatedNote);
}

export const deleteNote: APIGatewayProxyHandler = async (event, _context) => {
    const uuid = event.pathParameters['uuid'];
    const note = await notesRepository.deleteNote(uuid);
    return Responses.success(note);
}