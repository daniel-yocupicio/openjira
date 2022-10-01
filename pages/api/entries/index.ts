import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| {message: string}
| IEntry[]
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method === 'GET') return getEntries(res);
    if(req.method === 'POST') return postEntry(req, res);
    
    res.status(400).json({ message: 'Endpoint no existe' })
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find().sort({createdAt: 'ascending'});
    await db.disconnected();
    return res.status(200).json(entries);
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {description} = req.body;

    if(description === undefined) return res.status(400).json({message: 'descripccion incorrecta'});

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });

    try {
        await db.connect();
        await newEntry.save()
        await db.disconnected();

        return res.status(201).json( newEntry );

    } catch (e) {
        await db.disconnected();
        return res.status(500).json({message: 'Error con el servidor'})
    }
};  
