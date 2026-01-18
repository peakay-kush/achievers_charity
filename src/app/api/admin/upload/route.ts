import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const directory = formData.get('directory') as string || 'uploads';

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;

        // Define upload path - locally this works, on Vercel this is ephemeral
        const uploadDir = path.join(process.cwd(), 'public', 'assets', 'images', directory);

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);

        // Return relative path for frontend use
        const relativePath = `/assets/images/${directory}/${filename}`;

        return NextResponse.json({ success: true, path: relativePath });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'File upload failed' }, { status: 500 });
    }
}
