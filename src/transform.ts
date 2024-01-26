import { generateSlug, removeHashtags } from './utils';

import type { YoutubeSearchResult, SanityVideo } from './types';

/**
 * Transforms a Youtube search result into a Sanity video document.
 *
 * Edit this function to match your Sanity Video schema.
 *
 * @param youtubeResult A Youtube search result.
 * @returns A Sanity video document.
 */
export function transformVideo(youtubeResult: YoutubeSearchResult): SanityVideo | null {
  if (!youtubeResult.id?.videoId || !youtubeResult.snippet) {
    console.warn('Missing required YouTube result fields.');
    return null;
  }

  const youtubeId = youtubeResult.id.videoId;
  const title = removeHashtags(youtubeResult.snippet.title) || 'Untitled';
  const slug = generateSlug(title);
  const published = youtubeResult.snippet.publishedAt || new Date().toISOString();
  const description = youtubeResult.snippet.description || '';
  const channelId = youtubeResult.snippet.channelId || '';

  const sanityVideo: SanityVideo = {
    _id: youtubeId,
    _type: 'video',
    youtubeId,
    channelId,
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    description,
    published,
  };

  return sanityVideo;
}

/**
 * Get the highest quality thumbnail URL from a Youtube search result.
 *
 * @param youtubeResult A Youtube search result.
 * @returns The highest quality thumbnail URL.
 */
export function getVideoThumbnailUrl(youtubeResult: YoutubeSearchResult): string | null {
  return (
    youtubeResult.snippet?.thumbnails?.high?.url ||
    youtubeResult.snippet?.thumbnails?.medium?.url ||
    youtubeResult.snippet?.thumbnails?.default?.url ||
    null
  );
}
