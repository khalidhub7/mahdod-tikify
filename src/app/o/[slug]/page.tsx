import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashOverlaySecret } from "@/lib/overlay-token-generator";
import { OverlayClient } from "@/components/overlay/OverlayClient";

/*
src/app/o/[slug]/page.tsx
*/

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ secret?: string }>;
};

const eulerTokenSchema = z.object({
  overlay_id: z.uuid(),
  secret: z.string().length(43),
});

const OverlayPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { secret } = await searchParams;

  // validations
  const parsed = eulerTokenSchema.safeParse({ overlay_id: slug, secret });
  if (!parsed.success) return <div>Unauthorized</div>;

  // db
  const admin = createAdminClient();
  const submittedHash = hashOverlaySecret(parsed.data.secret);
  const { data: overlay, error } = await admin
    .from("overlays")
    .select(
      `
      id, tiktok_username,
      widgets (id, x, y, w, h, component)
      `,
    )
    .eq("id", slug)
    .eq("secret_hash", submittedHash)
    .eq("is_active", true)
    .single();

  if (error || !overlay) return <div>Unauthorized</div>;

  return (
    <main className="fixed inset-0 overflow-hidden bg-transparent">
      <OverlayClient overlay={overlay} secret={parsed.data.secret} />
    </main>
  );
};

export default OverlayPage;
