import clientPromise from '@/lib/mongodb';
export const dynamic = 'force-dynamic';  // <-- ADD THIS LINE

import { NextResponse } from 'next/server';

// your other code...

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix'); // replace with your DB name
    const data = await db.collection('comments').find({}).toArray();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
