-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "width" REAL NOT NULL,
    "length" REAL NOT NULL,
    "area" REAL NOT NULL,
    "grassType" TEXT NOT NULL,
    "totalPrice" REAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "installationDate" DATETIME NOT NULL,
    "paymentType" TEXT NOT NULL,
    "installmentMonths" INTEGER
);

-- CreateTable
CREATE TABLE "MaterialDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "grassAmount" REAL NOT NULL,
    "grassPrice" REAL NOT NULL,
    "sandAmount" REAL NOT NULL,
    "sandPrice" REAL NOT NULL,
    "rubberAmount" REAL NOT NULL,
    "rubberPrice" REAL NOT NULL,
    "tapeAmount" REAL NOT NULL,
    "tapePrice" REAL NOT NULL,
    "glueAmount" REAL NOT NULL,
    "gluePrice" REAL NOT NULL,
    "installationPrice" REAL NOT NULL,
    "miscPrice" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "vat" REAL NOT NULL,
    CONSTRAINT "MaterialDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialDetails_orderId_key" ON "MaterialDetails"("orderId");
