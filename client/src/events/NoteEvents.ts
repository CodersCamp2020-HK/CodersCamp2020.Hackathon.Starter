type Note = {
    name: string;
    time: string;
    description: string;
}

interface AddNotes {
    type: 'add_note',
    payload: Note
}

export type { AddNotes, Note };