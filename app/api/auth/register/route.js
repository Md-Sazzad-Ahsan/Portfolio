import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    const { username, email, password, isAdmin = false } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, isAdmin });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error); // Ensure detailed logging
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}
