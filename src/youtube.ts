import { google } from 'googleapis';
import type { YoutubeSearchResult } from './types';

const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || '';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const YOUTUBE_API_PAGE_SIZE = 50;
const YOUTUBE_API_RATE_LIMIT_TIMEOUT = 1000;

const youtube = google.youtube({
  version: 'v3',
  auth: GOOGLE_API_KEY,
});

export async function getChannelVideos(): Promise<YoutubeSearchResult[]> {
  let pageToken = '';
  const videos: YoutubeSearchResult[] = [];
  do {
    try {
      const response = await youtube.search.list({
        part: ['snippet'],
        channelId: YOUTUBE_CHANNEL_ID,
        maxResults: YOUTUBE_API_PAGE_SIZE,
        type: ['video'],
        order: 'date',
        pageToken: pageToken,
      });

      const { items, nextPageToken } = response.data;
      pageToken = nextPageToken || '';

      if (items && items.length > 0) {
        videos.push(...(items as YoutubeSearchResult[]));
      }

      await new Promise((resolve) => setTimeout(resolve, YOUTUBE_API_RATE_LIMIT_TIMEOUT));
    } catch (error) {
      console.error('Error fetching video list:', error);
      break;
    }
  } while (pageToken);

  return videos;
}
