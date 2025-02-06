import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const order = await prisma.order.update({
      where: {
        id: params.id
      },
      data: {
        status: data.status
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Order update failed:', error);
    return NextResponse.json(
      { success: false, error: 'Order update failed' },
      { status: 500 }
    );
  }
} 