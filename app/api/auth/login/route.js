import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';  // <-- ADD THIS LINE

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
