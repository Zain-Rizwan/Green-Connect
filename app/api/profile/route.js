export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    console.log("Fetching profile for user ID:", userId);
    
    const client = await clientPromise;
    const db = client.db();
    
    // Create response object with default values
    const profileData = {
      score: 0,
      eventsAttended: 0,
      eventsOrganized: 0,
      totalAttendees: 0,
      recentEvents: []
    };
    
    try {
      // Improve user lookup
      try {
        console.log("Looking for user with ID:", userId);
        
        // Try different ways to find the user
        let user = null;
        
        // Try by direct ID
        user = await db.collection('users').findOne({ _id: userId });
        
        // If not found, try by ObjectId
        if (!user && userId.length === 24) {
          try {
            const objectId = new ObjectId(userId);
            user = await db.collection('users').findOne({ _id: objectId });
          } catch (err) {
            console.log("Error converting to ObjectId:", err);
          }
        }
        
        // Still not found, try by string representation
        if (!user) {
          user = await db.collection('users').findOne({ _id: userId.toString() });
        }
        
        if (!user) {
          console.log("User not found after multiple attempts");
          // As a last attempt, log all user IDs to see what format they're in
          const allUsers = await db.collection('users').find({}, { projection: { _id: 1 } }).toArray();
          console.log("Available user IDs:", allUsers.map(u => u._id));
          
          return NextResponse.json(profileData); // Return defaults if user not found
        }
        
        console.log("Found user:", user.name, user.email, user.role);
        
        // Continue with the rest of your code...
      } catch (dbError) {
        console.error('Database error in profile API:', dbError);
        return NextResponse.json(profileData); // Return defaults on DB error
      }
      
      // Get user score
      const userScore = await db.collection('scores').findOne({ userId });
      if (userScore) {
        profileData.score = userScore.score;
      }
      
      if (user.role === 'ecowarrior') {
        // Get events attended by user
        const userEvents = await db.collection('user_event_attended').findOne({ userId });
        if (userEvents && userEvents.eventIds) {
          profileData.eventsAttended = userEvents.eventIds.length;
          
          // Get recent events details
          if (userEvents.eventIds.length > 0) {
            // Try different approaches to convert event IDs
            let eventObjectIds = [];
            try {
              // Try to convert to ObjectId if they're strings of the right format
              eventObjectIds = userEvents.eventIds
                .slice(0, 3)
                .map(id => typeof id === 'string' && id.length === 24 ? new ObjectId(id) : id);
            } catch (e) {
              console.log("Error converting event IDs:", e);
              eventObjectIds = userEvents.eventIds.slice(0, 3);
            }
            
            console.log("Looking for events with IDs:", eventObjectIds);
            
            // Use $in with an array of potential ID formats
            const events = await db.collection('events').find({ 
              $or: [
                { _id: { $in: eventObjectIds } },
                { id: { $in: userEvents.eventIds.slice(0, 3) } }
              ]
            }).toArray();
            
            profileData.recentEvents = events.map(event => ({
              id: event._id.toString(),
              title: event.title,
              description: event.description || "",
              date: event.date,
              location: event.location || "",
              organizer: event.organizer?.name || 'Unknown',
              attendees: event.attendees || 0,
              points: event.points || 0
            }));
          }
        }
      } else if (user.role === 'organization') {
        // Get events organized by organization
        const events = await db.collection('events').find({ 
          'organizer.id': userId 
        }).toArray();
        
        profileData.eventsOrganized = events.length;
        
        // Calculate total attendees across all events
        profileData.totalAttendees = events.reduce((total, event) => total + (event.attendees || 0), 0);
        
        // Get recent events details
        profileData.recentEvents = events.slice(0, 3).map(event => ({
          id: event._id.toString(),
          title: event.title,
          description: event.description || "",
          date: event.date,
          location: event.location || "",
          organizer: event.organizer?.name || 'Unknown',
          attendees: event.attendees || 0,
          points: event.points || 0
        }));
      }
      
      console.log("Returning profile data:", profileData);
      return NextResponse.json(profileData);
      
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return NextResponse.json(
        { success: false, message: error.message || 'Failed to fetch profile data' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}