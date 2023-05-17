-- CreateTable
CREATE TABLE "Sensitive_rules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensitive_rules_name" TEXT NOT NULL,
    "sensitive_rules_detail" TEXT NOT NULL,
    "sensitive_rules_content" TEXT NOT NULL,
    "sensitive_rules_create_time" DATETIME NOT NULL DEFAULT CURRENT_DATE
);
