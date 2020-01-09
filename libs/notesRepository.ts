import { DynamoDB } from 'aws-sdk';
import {v4 as uuid} from 'uuid';
import { getStage } from './helper';
import {Note, NoteBody} from './note';

class NotesRepository {

    private dynamoDb: DynamoDB.DocumentClient;
    private readonly tableName: string;

    constructor() {
        this.dynamoDb = new DynamoDB.DocumentClient();
        this.tableName = `hagenberg-${getStage()}-notes`;
    }

    public async createNote(noteBody: NoteBody): Promise<Note> {
        const note: Note = {
            uuid: uuid(),
            ... noteBody
        };
        return this.putNote(note);
    }

    public async getNote(uuid: string): Promise<Note> {
        const p = {
            TableName: this.tableName,
            Key: {
                uuid: uuid
            }
        };
        return this.dynamoDb.get(p).promise().then((response) => {
            return <Note>response.Item;
        });
    }

    public async putNote(note: Note): Promise<Note> {
        const p = {
            TableName: this.tableName,
            Item: note
        };
        await this.dynamoDb.put(p).promise();
        return note;
    }

    public async listNotes(): Promise<Note[]> {
        const p = {
            TableName: this.tableName,
        };
        return this.dynamoDb.scan(p).promise().then((r) => {
            if(r.Items) {
                return r.Items.map((u) => { return u as Note; });
            }else{
                return Promise.reject();
            }
        });
    }

    public async deleteNote(uuid: string): Promise<Note> {
        const currentNote = this.getNote(uuid);
        const p = {
            TableName: this.tableName,
            Key: {
                uuid: uuid
            }
        };
        return this.dynamoDb.delete(p).promise().then(() => {
            return currentNote;
        });
    }

}

export const notesRepository = new NotesRepository();