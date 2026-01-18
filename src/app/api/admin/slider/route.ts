import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'slider.json');

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
        const newSliderData = await req.json();

        // Load old data to find images to delete
        let imagesToDelete: string[] = [];
        try {
            const oldContent = fs.readFileSync(DATA_PATH, 'utf8');
            const oldData = JSON.parse(oldContent);
            const newImagePaths = new Set(newSliderData.map((s: any) => s.image));

            imagesToDelete = oldData
                .map((s: any) => s.image)
                .filter((img: string) => img && !newImagePaths.has(img) && !img.startsWith('http') && !img.includes('placeholder.jpg'));
        } catch (e) {
            console.error('Error finding old images:', e);
        }

        // Save back to file
        fs.writeFileSync(DATA_PATH, JSON.stringify(newSliderData, null, 2));

        // Cleanup physical files
        imagesToDelete.forEach(img => {
            const filePath = path.join(process.cwd(), 'public', img.startsWith('/') ? img.substring(1) : img);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted unreferenced image: ${filePath}`);
                } catch (err) {
                    console.error(`Failed to delete file ${filePath}:`, err);
                }
            }
        });

        return NextResponse.json({ message: 'Slider updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating data' }, { status: 500 });
    }
}

