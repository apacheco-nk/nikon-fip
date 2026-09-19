const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://rebewrngforfkvltbheg.supabase.co'
  ).replace(/\/$/, '');
const usesSupabase =
    process.env.NEXT_PUBLIC_GALLERY_STORAGE === 'supabase' ||
    process.env.NODE_ENV === 'production';

export function galleryUrl(localPath: string) {
    if (!localPath.startsWith('/gallery/') || !usesSupabase || !supabaseUrl)
          return localPath;
    const objectPath = localPath.replace(/^\/gallery\//, '');
    return `${supabaseUrl}/storage/v1/object/public/nikon-fip/${objectPath}`;
}
