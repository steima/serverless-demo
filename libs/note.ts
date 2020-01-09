export interface NoteBody {
    subject: string;
    body?: string;
}

export interface Note extends NoteBody{
    uuid: string;
}