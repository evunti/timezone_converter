import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveConversion = mutation({
  args: {
    fromTimezone: v.string(),
    toTimezone: v.string(),
    timestamp: v.number(),
    clock: v.string(), // Added clock to save the clock state
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("conversions", {
      userId,
      fromTimezone: args.fromTimezone,
      toTimezone: args.toTimezone,
      timestamp: args.timestamp,
      clock: args.clock, // Save the clock state
    });
  },
});

export const listRecentConversions = query({
  returns: v.array(
    v.object({
      fromTimezone: v.string(),
      toTimezone: v.string(),
      timestamp: v.number(),
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const results = await ctx.db
      .query("conversions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(5);

    return results.map(({ fromTimezone, toTimezone, timestamp }) => ({
      fromTimezone,
      toTimezone,
      timestamp,
    }));
  },
});

export const clearRecentConversions = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const conversionsToDelete = await ctx.db
      .query("conversions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    for (const conversion of conversionsToDelete) {
      await ctx.db.delete(conversion._id); // Fixed to use only one argument
    }
  },
});
