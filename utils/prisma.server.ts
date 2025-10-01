import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

// Always reuse a single instance, both dev and prod
if (!global.__prisma) {
  global.__prisma = new PrismaClient();
}

// eslint-disable-next-line prefer-const
prisma = global.__prisma;

prisma
  .$connect()
  .then(() => console.log("✅ Prisma connected"))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((err: any) => {
    console.error("Prisma connection error", err);
    process.exit(1);
  });

export default prisma;
