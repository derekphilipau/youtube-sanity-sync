import { basename } from 'path';
import { createReadStream } from 'fs';
import { client } from './client';
import type { SanityAssetDocument, SanityDocumentStub } from '@sanity/client';

export async function createImage(filePath: string): Promise<SanityAssetDocument> {
  return await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
  });
}

export async function addImageToDocument(
  documentId: string,
  imageId: string,
  fieldName = 'featuredImage',
) {
  return await client
    .patch(documentId)
    .set({ [fieldName]: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } })
    .commit();
}

export async function createImageAndAddToDocument(
  filePath: string,
  documentId: string,
  fieldName = 'featuredImage',
) {
  const image = await createImage(filePath);
  await addImageToDocument(documentId, image._id, fieldName);
}

export async function createDocument(
  document: SanityDocumentStub,
  options?: { dataset?: string; token?: string },
) {
  return await client.create(document, options);
}
