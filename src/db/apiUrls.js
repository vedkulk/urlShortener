import supabase, {supabaseUrl} from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id)

  if (error) {
    console.log(error.message)
    throw new Error("Unable to load urls")
  }

  return data;
}

export async function deleteUrl(id) {

  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete URL");
  }

  return data;
}

export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${shortUrl}`
  const { error: storageError } = await supabase.storage.from('QRs').upload(fileName, qrcode)

  const qr = `${supabaseUrl}/storage/v1/object/public/QRs/${fileName}`;

  const {data, error} = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url: shortUrl, 
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}