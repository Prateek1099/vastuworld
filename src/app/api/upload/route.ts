import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate the user here if needed
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
          tokenPayload: JSON.stringify({
            // metadata
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Run logic after upload is completed
        console.log('Blob upload completed', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
}
