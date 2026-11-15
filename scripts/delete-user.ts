import { createAdminClient } from "@/lib/supabase/admin";

const supabase = createAdminClient();

const deleteUserById = async (userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw error;

  console.log(`Successfully deleted user: ${userId}`);
};

// Replace with your test user's ID.
deleteUserById("USER_UUID").catch(console.error);
