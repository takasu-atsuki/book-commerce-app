import prisma from '@/app/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//購入履歴の保存
export async function POST(request: Request, response: Response) {
  const { sessionId } = await request.json();
  console.log('セッション情報：' + sessionId);
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId,
      },
    });

    if (!existingPurchase) {
      console.log('作成開始');
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      console.log(purchase);
      return Response.json({ purchase }, { status: 200 });
    } else {
      return Response.json({ message: '既に購入済です' }, { status: 200 });
    }
  } catch (err: any) {
    console.log(err.message);
    return Response.json({ error: err }, { status: 500 });
  }
}
