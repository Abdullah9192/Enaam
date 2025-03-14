-- CreateTable
CREATE TABLE "ShoppingCart" (
    "userId" TEXT NOT NULL,
    "cartItems" JSONB NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingCart_pkey" PRIMARY KEY ("userId")
);
