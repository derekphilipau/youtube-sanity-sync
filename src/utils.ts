import slugify from 'slugify';

export function generateSlug(title: string): string {
  return slugify(title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'",!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}

export function removeHashtags(text: string | null | undefined): string {
  if (!text) return '';
  return text.replace(/#(\w+)/g, '');
}
