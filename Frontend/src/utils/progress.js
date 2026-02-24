import { supabase } from "../supabaseClient";

export default async function saveModuleProgress(moduleId) {
  console.log("inside progress ");
  console.log(moduleId);

  // 🔧 Get logged-in user before writing progress
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    console.log("User not authenticated");
    return;
  }

  const user = authData.user;

  // 🔧 Capture both `data` and `error` so we can log the insert result correctly
  const { data, error } = await supabase
    .from("module_progress")
    .insert({
      user_id: user.id,
      module_id: moduleId,
      completed: true,
      completed_at: new Date(),
    });

  console.log("Insert result:", data);
  console.log("Insert error:", error);

  if (error) {
    console.error("Error saving progress:", error.message);
  }
}