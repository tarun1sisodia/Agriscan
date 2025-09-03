import { NextRequest, NextResponse } from 'next/server';

// Get environment variables
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const N8N_API_KEY = process.env.N8N_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // Check if n8n webhook URL is configured
    console.log('N8N_WEBHOOK_URL:', N8N_WEBHOOK_URL);
    if (!N8N_WEBHOOK_URL) {
      return NextResponse.json(
        { error: 'N8N webhook URL not configured' },
        { status: 500 }
      );
    }
    // Parse the multipart form data to get the image
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    
    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }
    console.log('Image file:', imageFile);
    // Convert the image to base64
    const imageBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    
    // ✅ Wrap payload inside "json" so n8n Function node sees it
    const n8nPayload = {
      json: {
        image: base64Image,
        filename: imageFile.name,
        contentType: imageFile.type,
        timestamp: new Date().toISOString(),
      },
    };
    
    // Add any additional options from the request
    const options = formData.get('options');
    if (options) {
      (n8nPayload.json as any).options = options.toString();
    }

    // Set up headers for the n8n request
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (N8N_API_KEY) {
      headers['X-N8N-API-KEY'] = N8N_API_KEY;
    }
    
    // Send the request to n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(n8nPayload),
    });
    
    // Check if the n8n request was successful
    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('N8N webhook error:', errorText);
      return NextResponse.json(
        { error: 'Error processing image with n8n' },
        { status: n8nResponse.status }
      );
    }
    
    // Return the n8n response
    const analysisResult = await n8nResponse.json();
    // console.log('N8N_API_KEY:', N8N_API_KEY);
    return NextResponse.json(analysisResult);
  } catch (error) {
    console.log('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
