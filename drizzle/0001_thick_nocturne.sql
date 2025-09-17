CREATE TABLE "shares" (
	"id" text PRIMARY KEY NOT NULL,
	"file_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"password_hash" text,
	"expires_at" timestamp,
	"view_once" boolean DEFAULT false NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
