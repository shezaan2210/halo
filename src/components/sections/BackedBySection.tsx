

export const BackedBySection = () => {
  const backers = [
    <div style={{ fontFamily: '"Times New Roman", serif', fontWeight: 400, letterSpacing: '0.02em', fontSize: '14px' }}>Fundamental Labs</div>,
    <div style={{ fontFamily: '"Arial Black", sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '16px' }}>KUCOIN</div>,
    <div style={{ fontFamily: 'Impact, sans-serif', fontWeight: 700, letterSpacing: '0.05em', fontSize: '18px' }}>NGC</div>,
    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '-0.02em', fontSize: '17px' }}>NxGen</div>,
    <div style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: '15px' }}>Matter Labs</div>,
    <div style={{ fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '0.06em', fontSize: '14px', textTransform: 'uppercase' }}>DEXTools</div>,
    <div style={{ fontFamily: '"Courier New", monospace', fontWeight: 700, letterSpacing: '0.18em', fontSize: '14px' }}>NGRAVE</div>,
    <div style={{ fontFamily: 'Palatino, serif', fontWeight: 500, letterSpacing: '0.03em', fontSize: '15px' }}>Polychain</div>,
  ];

  const backerElements = backers.map((backer, i) => (
    <div key={i} className="mx-10 shrink-0 text-black/50 whitespace-nowrap">
      {backer}
    </div>
  ));

  return (
    <section className="bg-[#F5F5F5] px-6 overflow-hidden">
      <div className="max-w-[96vw] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center py-12">
        <div className="md:col-span-1">
          <p className="text-black/70 text-base leading-relaxed whitespace-pre-line">
            {"Funded by premier partners\nand forward-thinking leaders."}
          </p>
        </div>
        <div className="md:col-span-3 relative overflow-hidden">
          <div className="backers-track">
            {backerElements}
            {backerElements}
          </div>
        </div>
      </div>
    </section>
  );
};