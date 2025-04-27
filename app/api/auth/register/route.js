export const dynamic = 'force-dynamic';  // <-- ADD THIS LINE
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');
    
    const { name, email, password, role } = await request.json();
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || 'ecowarrior',
      createdAt: new Date()
    });
    
    // Get the created user
    const user = await usersCollection.findOne({ _id: result.insertedId });
    
    // Remove password from response
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    return NextResponse.json(
      { success: true, message: 'Registration successful', user: userResponse },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

