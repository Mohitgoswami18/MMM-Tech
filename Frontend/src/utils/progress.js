import { supabase } from "../supabaseClient";

export default async function saveModuleProgress(moduleId) {
  console.log("inside progress ");
  console.log("Saving module progress for id:", moduleId); // 🔧 clearer log

  try {
    // 🔧 Get logged-in user before writing progress
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData?.user) {
      console.log("User not authenticated", authError); // 🔧 log auth error details
      return;
    }

    const user = authData.user;

    // 🔧 Use INSERT (as requested) to create a new progress row
    const { data, error } = await supabase
      .from("module_progress")
      .insert({
        user_id: user.id,
        module_id: moduleId,
        
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .select("*"); // 🔧 force Supabase to return the inserted row(s)

    console.log("Inserted progress rows:", data);

    if (error) {
      console.error("Error saving progress (insert):", error);
    }
  } catch (e) {
    console.error("Unexpected error in saveModuleProgress:", e); // 🔧 catch any runtime issues
  }
}

export async function fetchCompletedModules(userId) {
  const { data, error } = await supabase
    .from("module_progress")
    .select("module_id")
    .eq("user_id", userId)
    .eq("completed", true);

  if (error) throw error;
  return data;
}