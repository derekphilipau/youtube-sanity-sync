/**
 * This script migrates a YouTube channel's RSS feed to Sanity
 *
 * https://www.youtube.com/feeds/videos.xml?channel_id=UCyvJJK3hVcGRZnUF3Sv3hkA
 */
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || '';

import { fetchRssFeed, parseXmlToJson, getSlug, removeHashtags } from './utils';

import { createDocument, createImageAndAddToDocument } from '../../sanity/image';

import type { YoutubeRssFeedEntry, SanityVideo, TransformResult } from './types';

async function migrate(channelId: string) {
  const xml = await fetchRssFeed(channelId);
  const jsonData = await parseXmlToJson(xml);
  if (jsonData.feed && jsonData.feed.entry && jsonData.feed.entry.length > 0) {
    for (const entry of jsonData.feed.entry) {
      const { video, imageUrl } = await transform(entry);
      console.log('video:', video);
      console.log('imageUrl:', imageUrl);
      const document = await createDocument(video);
      if (document && imageUrl) {
        await createImageAndAddToDocument(imageUrl, document._id);
      }
    }
  }
}

async function transform(entry: YoutubeRssFeedEntry): Promise<TransformResult> {
  const title = removeHashtags(entry.title?.[0] || '');
  const video = {
    _id: entry.id?.[0] || '',
    _type: 'video',
    youtubeId: entry['yt:videoId']?.[0] || '',
    channelId: entry['yt:channelId']?.[0] || '',
    title: title,
    slug: {
      _type: 'slug',
      current: getSlug(title),
    },
    description: entry['media:group']?.[0]['media:description']?.[0] || '',
    published: entry.published?.[0] || '',
  } as SanityVideo;
  const imageUrl = entry['media:group']?.[0]['media:thumbnail']?.[0].$.url;
  return { video, imageUrl };
}

const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

migrate(url).catch(console.error);
