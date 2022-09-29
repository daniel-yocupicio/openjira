export interface Entry {
    _id: String;
    description: String;
    createdAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'; 