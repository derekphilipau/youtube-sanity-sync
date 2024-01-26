export interface YoutubeRssFeedEntry {
  id?: string[];
  'yt:videoId'?: string[];
  'yt:channelId'?: string[];
  title?: string[];
  link?: {
    $: {
      rel?: string;
      href?: string;
    };
  }[];
  author?: {
    name?: string[];
    uri?: string[];
  }[];
  published?: string[];
  updated?: string[];
  'media:group'?: {
    'media:title'?: string[];
    'media:content'?: {
      $: {
        url?: string;
        type?: string;
        width?: string;
        height?: string;
      };
    }[];
    'media:thumbnail'?: {
      $: {
        url?: string;
        width?: string;
        height?: string;
      };
    }[];
    'media:description'?: string[];
    'media:community'?: {
      'media:starRating'?: {
        $: {
          count?: string;
          average?: string;
          min?: string;
          max?: string;
        };
      }[];
      'media:statistics'?: {
        $: {
          views?: string;
        };
      }[];
    }[];
    'media:keywords'?: string[];
  }[];
}

export interface SanityVideo {
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

export interface TransformResult {
  video: SanityVideo;
  imageUrl?: string;
}
