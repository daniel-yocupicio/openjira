interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
        description: string;
        status: string;
        createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Eliminar datos de la base de datos',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Crear el deploy de la app',
            status: 'in-progress',
            createdAt: Date.now(),
        },
        {
            description: 'Realizar los test',
            status: 'pending',
            createdAt: Date.now(),
        },
    ],
};