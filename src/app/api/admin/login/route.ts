import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import adminData from '@/data/admin.json';

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_secret'
);

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (username !== adminData.username) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, adminData.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Create JWT
        const token = await new SignJWT({ username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(SECRET_KEY);

        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

        // Set cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
    }
}
