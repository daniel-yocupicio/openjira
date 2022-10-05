import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| {message: string}
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {   
    const {id} = req.query;

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({ message: 'El id no es válido' });
    }

    if(req.method === 'PUT') return putUpdateEntry(req, res);
    if(req.method === 'GET') return getEntryById(req, res);

    res.status(404).json({ message: 'Ruta no existente' });
}

const putUpdateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;
    
    await db.connect();
    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate) {
        await db.disconnected();
        return res.status(404).json({ message: 'Ese dato no existe.' });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const entryUpdated = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        await db.disconnected();
        return res.status(201).json(entryUpdated!);
    } catch(e: any) {
        await db.disconnected();
        return res.status(400).json({message: e.errors.status.message});
    }
};

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;

    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnected();

    if(!entry) return res.status(200).json({message: 'No se encontro ese dato.'});
    return res.status(200).json(entry);
}