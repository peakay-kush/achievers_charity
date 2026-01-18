import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'links.json');

export async function GET() {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            return NextResponse.json([]);
        }
        const fileContent = fs.readFileSync(DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const newData = await req.json();

        // Save back to file
        fs.writeFileSync(DATA_PATH, JSON.stringify(newData, null, 2));

        return NextResponse.json({ message: 'Links updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating data' }, { status: 500 });
    }
}
