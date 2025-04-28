export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    // Parse request body with user data
    const { title, description, date, location, type, points, user } = await request.json();
    
    // Create the event with the actual user info
    const result = await eventsCollection.insertOne({
      title,
      description,
      date: new Date(date),
      location,
      type,
      points: Number(points),
      attendees: 0,
      createdAt: new Date(),
      organizer: {
        id: user.id,       // Use actual user ID
        name: user.name    // Use actual user name
      }
    });
    
    // Get the created event
    const event = await eventsCollection.findOne({ _id: result.insertedId });
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Event created successfully', 
        event: {
          id: event._id.toString(),
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          type: event.type,
          points: event.points,
          attendees: event.attendees,
          organizer: event.organizer.name
        } 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create event' },
      { status: 500 }
    );
  }
}

// GET method to fetch events
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const period = searchParams.get('period');
    
    const client = await clientPromise;
    const db = client.db();
    const eventsCollection = db.collection('events');
    
    // Build query based on filters
    let query = {};
    
    // Filter by event type
    if (type && type !== 'all') {
      query.type = type;
    }
    
    // Filter by time period
    if (period) {
      const now = new Date();
      
      if (period === 'upcoming') {
        query.date = { $gte: now };
      } else if (period === 'today') {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        query.date = { 
          $gte: now,
          $lt: tomorrow
        };
      } else if (period === 'past') {
        query.date = { $lt: now };
      } else if (period === 'week') {
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        query.date = { 
          $gte: now,
          $lt: nextWeek
        };
      } else if (period === 'month') {
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        query.date = { 
          $gte: now,
          $lt: nextMonth
        };
      }
    }
    
    // Get events with filters
    const events = await eventsCollection.find(query)
      .sort({ date: 1 })
      .toArray();
    
    // Format events to match the client-side Event interface
    const formattedEvents = events.map(event => ({
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      type: event.type,
      points: event.points,
      attendees: event.attendees || 0, // Use the actual value from DB with fallback to 0
      organizer: event.organizer?.name || 'Unknown Organization',
      imageUrl: '/placeholder.svg'  // Add a default image URL
    }));
    
    return NextResponse.json({ events: formattedEvents });
    
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch events' },
      { status: 500 }
    );
  }
}