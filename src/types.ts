import type { IdentifiedSanityDocumentStub } from '@sanity/client';

export interface YoutubeSearchResult {
  etag?: string | null;
  id?: {
    kind?: string | null;
    channelId?: string | null;
    videoId?: string | null;
  } | null;
  kind?: string | null;
  snippet?: {
    channelId?: string | null;
    channelTitle?: string | null;
    description?: string | null;
    liveBroadcastContent?: string | null;
    publishedAt?: string | null;
    thumbnails?: {
      default?: { url: string | null; width?: number | null; height?: number | null } | null;
      medium?: { url: string | null; width?: number | null; height?: number | null } | null;
      high?: { url: string | null; width?: number | null; height?: number | null } | null;
    } | null;
    title?: string | null;
  } | null;
}

export interface SanityVideo extends IdentifiedSanityDocumentStub {
  _id: string;
  _type: 'video';
  youtubeId: string;
  channelId?: string;
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: string;
  featuredImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  published: string;
}
