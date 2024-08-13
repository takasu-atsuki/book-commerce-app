import prisma from '@/app/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: userId },
    });

    return Response.json({ purchases }, { status: 200 });
  } catch (err) {
    Response.json({ error: err }, { status: 500 });
  }
}
