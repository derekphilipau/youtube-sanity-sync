# Youtube Sanity Connect

This is a simple script to sync your YouTube videos to Sanity.

Can be run as a one-off or as a cron job.

## Google Cloud Setup

1. Create a new project
2. Enable the Google YouTube Data API v3
3. In Credentials, create a new API key
4. Edit the key and restrict it to the YouTube Data API v3

## Youtube Setup

1. Go to youtube, click your profile icon then "View your channel".
2. Copy the channel ID from the URL, e.g. "https://www.youtube.com/channel/UC1tyDLOJGd8Csw4B8dlZOSQ" has a channel ID of "UC1tyDLOJGd8Csw4B8dlZOSQ".

## Sanity Setup

1. In your Sanity Project, create an API Token with Editor access.
2. Save the key in your .env file SANITY_TOKEN

## Project Setup

1. Clone the repo
2. Run `yarn install`
3. Create a .env file with the environment variables below
4. Edit `src/transform.ts` and change the schema to match your Sanity schema
5. Run the sync: `npx ts-node src/sync.ts`

## Environment Variables

```
SANITY_PROJECT_ID=myProjectId
SANITY_DATASET=myDatasetName
SANITY_API_VERSION=2024-01-01
SANITY_TOKEN=myToken      # Sanity API Token with Editor access
SANITY_IS_REPLACE=false   # Set to true if you want to replace all existing data
YOUTUBE_CHANNEL_ID=YourYoutubeChannelId
GOOGLE_API_KEY=YourGoogleApiKey
```
