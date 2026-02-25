import { supabase } from "../supabaseClient";

export async function fetchUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("name, email, avatar_url")
    .eq("id", userId)
    .single();

    console.log(data);

  if (error) throw error;
  return data;
}