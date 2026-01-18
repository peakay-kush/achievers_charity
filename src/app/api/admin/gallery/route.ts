import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'gallery.json');

export async function GET() {
    try {
        const fileContent = fs.readFileSync(DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const newGalleryData = await req.json();
        fs.writeFileSync(DATA_PATH, JSON.stringify(newGalleryData, null, 2));
        return NextResponse.json({ message: 'Gallery updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating data' }, { status: 500 });
    }
}
