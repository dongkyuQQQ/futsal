import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('서버에서 받은 데이터:', {
      제품정보: {
        가로: data.width,
        세로: data.length,
        잔디타입: data.grassType,
        총금액: data.total
      },
      구매자정보: {
        사업자명: data.businessName,
        구장명: data.fieldName,
        주소: data.address,
        설치희망일: data.installationDate
      }
    });

    // 데이터 검증
    if (!data.width || !data.length || !data.grassType || !data.total) {
      throw new Error('필수 제품 정보가 누락되었습니다');
    }

    if (!data.businessName || !data.fieldName || !data.address || !data.installationDate) {
      throw new Error('필수 구매자 정보가 누락되었습니다');
    }

    if (!data.calculation?.materials) {
      throw new Error('견적 정보가 누락되었습니다');
    }

    try {
      // 1. 기본 주문 생성
      const order = await prisma.order.create({
        data: {
          width: parseFloat(data.width),
          length: parseFloat(data.length),
          area: parseFloat(data.width) * parseFloat(data.length),
          grassType: data.grassType,
          totalPrice: parseFloat(data.total),
          businessName: data.businessName,
          fieldName: data.fieldName,
          address: data.address,
          installationDate: new Date(data.installationDate),
          paymentType: data.paymentType || 'full',
          installmentMonths: data.installmentMonths ? parseInt(data.installmentMonths) : null
        }
      });

      console.log('주문 생성 완료:', order);

      // 2. 자재 정보 생성
      const materials = await prisma.materialDetails.create({
        data: {
          orderId: order.id,
          grassAmount: data.calculation.materials.grass.amount,
          grassPrice: data.calculation.materials.grass.price,
          sandAmount: data.calculation.materials.sand.amount,
          sandPrice: data.calculation.materials.sand.price,
          rubberAmount: data.calculation.materials.rubber.amount,
          rubberPrice: data.calculation.materials.rubber.price,
          tapeAmount: data.calculation.materials.tape.amount,
          tapePrice: data.calculation.materials.tape.price,
          glueAmount: data.calculation.materials.glue.amount,
          gluePrice: data.calculation.materials.glue.price,
          installationPrice: data.calculation.materials.installation.price,
          miscPrice: data.calculation.materials.misc.price,
          subtotal: data.calculation.subtotal,
          vat: data.calculation.vat
        }
      });

      console.log('자재 정보 생성 완료:', materials);

      return NextResponse.json({ 
        success: true, 
        message: '주문이 성공적으로 생성되었습니다',
        data: {
          order,
          materials
        }
      });

    } catch (dbError) {
      console.error('데이터베이스 오류:', dbError);
      return NextResponse.json({ 
        success: false, 
        error: '데이터베이스 오류가 발생했습니다',
        details: dbError instanceof Error ? dbError.message : '알 수 없는 오류'
      }, { 
        status: 500 
      });
    }
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: '요청을 처리하는 중 오류가 발생했습니다',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { 
      status: 500 
    });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        materials: true
      }
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 