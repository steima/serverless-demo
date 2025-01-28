import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {v4 as uuid} from 'uuid';
import {getStage} from './helper';
import {Note, NoteBody} from './note';
import {DynamoDBDocumentClient, DeleteCommand, GetCommand, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

class NotesRepository {

    private dynamoDbClient: DynamoDBClient;
    private dynamoDbDocumentClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        this.dynamoDbClient = new DynamoDBClient({});
        this.dynamoDbDocumentClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
        this.tableName = `${getStage()}-notes`;
    }

    public async createNote(noteBody: NoteBody): Promise<Note> {
        const note: Note = {
            uuid: uuid(),
            ... noteBody
        };
        return this.putNote(note);
    }

    public async getNote(uuid: string): Promise<Note> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: {
                uuid: uuid
            }
        });
        const result = await this.dynamoDbDocumentClient.send(command);
        return <Note>result.Item;
    }

    public async putNote(note: Note): Promise<Note> {
        const command =  new PutCommand({
            TableName: this.tableName,
            Item: note
        });
        await this.dynamoDbDocumentClient.send(command);
        return note;
    }

    public async listNotes(): Promise<Note[]> {
        const command = new ScanCommand({
            TableName: this.tableName,
        });
        const result = await this.dynamoDbDocumentClient.send(command);
        if (result.Items) {
            console.log(result);
            return result.Items.map((u) => u as Note);
        }
        throw new Error("No notes found");
    }

    public async deleteNote(uuid: string): Promise<Note> {
        const currentNote = this.getNote(uuid);
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: {
                uuid: uuid
            }
        });
        await this.dynamoDbDocumentClient.send(command);
        return currentNote;
    }

}

export const notesRepository = new NotesRepository();