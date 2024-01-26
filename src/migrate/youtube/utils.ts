import { parseStringPromise } from 'xml2js';
import slugify from 'slugify';

export async function fetchRssFeed(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }
    const xml = await response.text();
    return xml;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}

export async function parseXmlToJson(xml: string) {
  try {
    const json = await parseStringPromise(xml);
    return json;
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw error;
  }
}

export function getSlug(title: string): string {
  return slugify(title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'",!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}

export function removeHashtags(text: string): string {
  if (!text) return '';
  return text.replace(/#(\w+)/g, '');
}
