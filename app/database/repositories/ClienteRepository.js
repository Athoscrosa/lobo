import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { cliente } from '../schema.js';

export default class ProductRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(cliente).values({
                name: data.name,
                cpf: data.cpf
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
    static async search({ draw, start = 0, length = 10, search = '' }) {
        try {
            const term = `%${search}%`;

            // Total sem filtro
            const totalResult = await db
                .select({ total: sql`count(*)::int` })
                .from(cliente);

            const recordsTotal = totalResult[0]?.total ?? 0;

            // Total filtrado
            const filteredResult = await db
                .select({ filtered: sql`count(*)::int` })
                .from(cliente)
                .where(sql`
                    name     ILIKE ${term}
                    OR category ILIKE ${term}
                `);

            const recordsFiltered = filteredResult[0]?.filtered ?? 0;

            // Dados da página
            const data = await db
                .select()
                .from(cliente)
                .where(sql`
                    name     ILIKE ${term}
                    OR category ILIKE ${term}
                `)
                .limit(length)
                .offset(start)
                .orderBy(cliente.name);

            return {
                draw,
                recordsTotal,
                recordsFiltered,
                data,
            };

        } catch (error) {
            console.error('[ClienteRepository] Erro na busca:', error.message);

            return {
                draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
            };
        }
    }
}