
export default function SectionHeader({ title, onPrev, onNext, showArrows=true }) {
  return (
    <div className="flex items-center justify-between mb-3 px-4">
      <h2 className="text-xl font-extrabold">{title}</h2>
      {showArrows && (
        <div className="flex gap-2">
          <button onClick={onPrev} className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 grid place-items-center">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M15 6l-6 6 6 6"/></svg>
          </button>
          <button onClick={onNext} className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 grid place-items-center">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
