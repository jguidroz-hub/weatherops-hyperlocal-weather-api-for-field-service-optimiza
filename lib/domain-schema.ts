import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default('true'),
  weeklyDigest: boolean('weekly_digest').default('true'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Geospatial locations tracked for weather monitoring
export const locations = pgTable('locations', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  radiusKm: text('radius_km').default(5),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// 15-minute precipitation predictions for tracked locations
export const weatherForecasts = pgTable('weather_forecasts', {
  id: text('id').primaryKey(),
  locationId: text('location_id').references(() => locations.id, { onDelete: 'cascade' }),
  forecastTime: timestamp('forecast_time').notNull(),
  precipitationProbability: text('precipitation_probability').notNull(),
  precipitationIntensity: text('precipitation_intensity').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
