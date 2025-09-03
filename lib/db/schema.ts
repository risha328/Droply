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