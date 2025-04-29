import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveConversion = mutation({
  args: {
    fromTimezone: v.string(),
    toTimezone: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.db.insert("conversions", {
      userId,
      fromTimezone: args.fromTimezone,
      toTimezone: args.toTimezone,
      timestamp: args.timestamp,
    });
  },
});

export const listRecentConversions = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    
    return await ctx.db
      .query("conversions")
      .withIndex("by_user", q => q.eq("userId", userId))
      .order("desc")
      .take(5);
  },
});
