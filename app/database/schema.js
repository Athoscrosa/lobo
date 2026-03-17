import { pgTable, varchar, numeric, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});

export const cliente = pgTable("cliente", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    cpf: varchar("cpf", { length: 14 }).notNull(),
    rg: varchar("rg", { length: 12 }).notNull(),
});

export const usuario = pgTable("usuario", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    contato: varchar("contato", { length: 255 }).notNull(),
});

export const empresa = pgTable("empresa", {
    id: serial("id").primaryKey(),
    razaoSocial: varchar("razaoSocial", { length: 255 }).notNull(),
    nomeFantasia: varchar("nomeFantasia", { length: 255 }).notNull(),
    cnpj: varchar("cnpj", { length: 18 }).notNull(),
    ie: varchar("ie", { length: 15 }).notNull(),
});