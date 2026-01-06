import { prisma } from "@/lib/db";

export const PUT = async (
  req: Request,
  context: { params: Promise<{ postId: string }> }
) => {
  try {
    const { postId } = await context.params;

    if (!postId) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), {
        status: 400,
      });
    }

    const body = await req.json();
    const { caption, images } = body;

    if (!caption && !images) {
      return new Response(JSON.stringify({ error: "Nothing to update" }), {
        status: 400,
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        caption: caption ?? post.caption,
        images: images ?? post.images,
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
