export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const { eventId, userId, eventPoints } = await request.json();
    
    if (!eventId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    // 1. Update user_event_attended collection (what events a user has attended)
    await db.collection('user_event_attended').updateOne(
      { userId },
      { $addToSet: { eventIds: eventId } },
      { upsert: true }
    );
    
    // 2. Update event_users collection (who has attended an event)
    await db.collection('event_users').updateOne(
      { eventId },
      { $addToSet: { userIds: userId } },
      { upsert: true }
    );
    
    // 3. Update the attendee count in the events collection
    await db.collection('events').updateOne(
      { _id: new ObjectId(eventId) },
      { $inc: { attendees: 1 } }
    );
    
    // 4. Update or create user score
    await db.collection('scores').updateOne(
      { userId },
      { $inc: { score: eventPoints } },
      { upsert: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined event' 
    });
    
  } catch (error) {
    console.error('Error joining event:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to join event' },
      { status: 500 }
    );
  }
}