import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, or, sql, asc } from 'drizzle-orm';
import Connection from '../Connection.js';
import { empresa } from '../schema.js';

export default class EmpresaRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(empresa).values({
                razaoSocial: data.razaoSocial,
                nomeFantasia: data.nomeFantasia,
                cnpj: data.cnpj,
                ie: data.ie
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
    static async search(data) {
        //Captura o termo de pesquisa sem o %%
        const rawSearch = String(data?.term ?? '').trim();
        //Captura o termo da pesquisa já aplicando o %%
        const terms = `%${data?.term}%`;
        try {
            //Abre a conexão com banco de dados
            const client = await Connection.connect();
            const db = drizzle(client);
            const whereClause =
                rawSearch !== ''
                    ? or(
                        sql`${empresa.id}::text ILIKE ${terms}`,
                        ilike(empresa.razaoSocial, terms),
                        ilike(empresa.nomeFantasia, terms),
                        ilike(empresa.cnpj, terms),
                        ilike(empresa.ie, terms)
                    )
                    : undefined;

            const result = await db
                .select()
                .from(empresa)
                .where(whereClause)
                .orderBy(asc(empresa.razaoSocial, empresa.id, empresa.cnpj))
                .offset(data?.offset)
                .limit(data?.limit);

            return {
                data: result
            };
        } catch (error) {
            console.error('[empresaRepository] Erro na busca:', error.message);
            return {
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
            };
        }
    }
}