// src/routes/api/data/+server.js
import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

const DATA_PATH = path.resolve('src/lib/data.json');

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return json(data);
  } catch (err) {
    return new Response('Failed to read data', { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2));
    return new Response('Data saved', { status: 200 });
  } catch (err) {
    return new Response('Failed to write data', { status: 500 });
  }
}
