import { supabase } from "../supabaseClient";

export async function getcurrenUser(){
     const { data, error } = await supabase.auth.getUser();
     console.log(data);
  if (error) throw error;
  return data.user;

}