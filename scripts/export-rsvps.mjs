// Writes every RSVP to rsvps.csv. Run on your own computer: npm run export:rsvps
// Needs EXPO_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
import { writeFileSync } from 'node:fs';

process.loadEnvFile('.env.local');
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set EXPO_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.');
  process.exit(1);
}

const headers = { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}) };
const response = await fetch(`${url}/rest/v1/rsvps?select=*&order=created_at`, { headers });
if (!response.ok) {
  console.error(`Export failed: ${response.status} ${await response.text()}`);
  process.exit(1);
}

const rows = await response.json();
const columns = [
  ['Name', 'full_name'],
  ['Email', 'email'],
  ['Attending', 'attending'],
  ['Guests', 'guest_count'],
  ['Guest names', 'guest_names'],
  ['Dietary requirements', 'dietary_requirements'],
  ['Food preference', 'food_preference'],
  ['Guest dietary requirements', 'guest_dietary_requirements'],
  ['Guest food preference', 'guest_food_preference'],
  ['Song request', 'song_request'],
  ['Special information', 'special_information'],
  ['Comments', 'comments'],
  ['Replied at', 'created_at'],
];

// A leading ' stops spreadsheet apps from running guest-supplied text as a formula.
const cell = (value) => {
  let text = Array.isArray(value) ? value.join('; ') : String(value ?? '');
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};
const lines = [columns.map(([label]) => cell(label)).join(',')];
for (const row of rows) lines.push(columns.map(([, field]) => cell(row[field])).join(','));

writeFileSync('rsvps.csv', `﻿${lines.join('\r\n')}\r\n`);
const attending = rows.filter((row) => row.attending);
console.log(`rsvps.csv: ${rows.length} replies, ${attending.length} attending, ${attending.reduce((sum, row) => sum + row.guest_count, 0)} guests.`);
