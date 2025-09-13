import supabase from "./supabase";

export async function getClicks(urlsIds){
    const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlsIds)

    if(error){
        console.log(error.message)
        throw new Error("Unable to load clicks")
    }

    return data;
}