import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const ADMIN_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'admin.json');

export async function POST(req: Request) {
    try {
        const { currentPassword, newPassword } = await req.json();

        if (!fs.existsSync(ADMIN_DATA_PATH)) {
            return NextResponse.json({ message: 'Admin data not found' }, { status: 500 });
        }

        const fileContent = fs.readFileSync(ADMIN_DATA_PATH, 'utf8');
        const adminData = JSON.parse(fileContent);

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, adminData.password);
        if (!isValid) {
            return NextResponse.json({ message: 'Incorrect current password' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update admin data
        adminData.password = hashedPassword;

        fs.writeFileSync(ADMIN_DATA_PATH, JSON.stringify(adminData, null, 2));

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating password' }, { status: 500 });
    }
}
