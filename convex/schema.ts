import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  conversions: defineTable({
    userId: v.id("users"),
    fromTimezone: v.string(),
    toTimezone: v.string(),
    timestamp: v.number(),
    clock: v.optional(v.string()), // Made clock field optional
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
