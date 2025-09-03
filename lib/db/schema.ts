import { relations } from "drizzle-orm";
import { text, uuid, integer, boolean, pgTable, timestamp } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    //basic file/folder info
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),


    //storage info
    fileUrl: text("file_url").notNull(),  //url to access file
    thumbnailUrl: text("thumbnail_url"),   //url to thumbnail of the file


    //OwnerShip info
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),


    //file/folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),


    //time stamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})


/**
 parent : each file/folder can have one parent folder/file
 children : each file/folder can have multiple children folders/files
 */
export const filesRelations = relations(files, ({one, many}) => ({
    parent: one(files, {
        fields:[files.parentId],
        references:[files.id]
    }),

    //relationship to child file
    children: many(files),
}));

//Type definations 

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;