const tickerItems = [
  'IEEE CS Workshop registrations are now open.',
  'Past paper contribution drive is live.',
  'CS Block navigation beta is available.',
];

export default function AnnouncementBar() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden bg-ieee-ink py-2 text-white">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-mono text-[11px] uppercase tracking-wider">
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2 text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-ieee-orange" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
