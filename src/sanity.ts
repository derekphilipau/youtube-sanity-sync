import { basename } from 'path';
import { Readable } from 'stream';
import type { SanityAssetDocument, IdentifiedSanityDocumentStub } from '@sanity/client';

import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export async function createImage(imageUrl: string): Promise<SanityAssetDocument> {
  const imageBuffer = await fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => blob.arrayBuffer())
    .then((arrayBuffer) => Buffer.from(arrayBuffer));

  const stream = new Readable({
    read() {
      this.push(imageBuffer);
      this.push(null);
    },
  });

  return client.assets.upload('image', stream, {
    filename: basename(imageUrl),
  });
}

export async function createDocumentWithImage(
  document: IdentifiedSanityDocumentStub,
  imageUrl: string,
  imageFieldName: string,
  isReplace = false,
) {
  const image = await createImage(imageUrl);

  if (!image) throw new Error('Failed to create image.');

  document[imageFieldName] = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: image._id,
    },
  };

  if (isReplace) {
    return await client.createOrReplace(document);
  }
  return await client.createIfNotExists(document);
}
