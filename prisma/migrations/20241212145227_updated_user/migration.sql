-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "availebel" BOOLEAN NOT NULL DEFAULT true,
    "createdUser" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedUser" DATETIME NOT NULL
);
INSERT INTO "new_User" ("availebel", "createdUser", "email", "password", "role_id", "updatedUser", "user_id", "username") SELECT "availebel", "createdUser", "email", "password", "role_id", "updatedUser", "user_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
