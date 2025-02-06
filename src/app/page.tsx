import Image from 'next/image';

export default function Home() {
    return (
      <main>
        {/* 히어로 섹션 */}
        <section className="bg-green-600 text-white py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4">프리미엄 풋살장 인조잔디</h1>
              <p className="text-lg sm:text-xl">최고급 품질의 인조잔디로 최상의 경기를 즐기세요</p>
            </div>
          </div>
        </section>
  
        {/* 제품 소개 섹션 */}
        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">제품 라인업</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 sm:h-64 relative">
                  <Image
                    src="/images/futsal-field.jpg"
                    alt="35mm 인조잔디"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold mb-2">TM35e+</h3>
                  <p className="text-gray-600 mb-4">표준형 풋살장 잔디</p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li>• 파일 높이: 35mm</li>
                    <li>• 적정 충진량: 25kg/m²</li>
                    <li>• 내구성: 최상</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 sm:h-64 relative">
                  <Image
                    src="/images/futsal-field.jpg"
                    alt="55mm 인조잔디"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold mb-2">TM55e+</h3>
                  <p className="text-gray-600 mb-4">프리미엄 풋살장 잔디</p>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li>• 파일 높이: 55mm</li>
                    <li>• 적정 충진량: 30kg/m²</li>
                    <li>• 내구성: 최상</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA 섹션 */}
        <section className="py-10 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">견적 계산 및 상품 신청</h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base">풋살장 규격을 입력하고 즉시 견적을 받아보세요</p>
            <a 
              href="/estimate" 
              className="inline-block bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              견적 계산하러 가기
            </a>
          </div>
        </section>
      </main>
    );
  }