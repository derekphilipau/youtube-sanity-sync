import dotenv from 'dotenv';
dotenv.config();

import { getChannelVideos } from './youtube';
import { transformVideo, getVideoThumbnailUrl } from './transform';
import { createDocumentWithImage } from './sanity';

const SANITY_DOCUMENT_IMAGE_FIELD_NAME = 'featuredImage';
const SANITY_IS_REPLACE = process.env.SANITY_IS_REPLACE === 'true';

async function sync() {
  const videos = await getChannelVideos();

  for (const video of videos) {
    const sanityVideo = transformVideo(video);
    const imageUrl = getVideoThumbnailUrl(video);

    if (sanityVideo && imageUrl) {
      const sanityDoc = await createDocumentWithImage(
        sanityVideo,
        imageUrl,
        SANITY_DOCUMENT_IMAGE_FIELD_NAME,
        SANITY_IS_REPLACE,
      );
      console.log('Updated Sanity Document:', sanityDoc);
    }
  }
}

sync();
