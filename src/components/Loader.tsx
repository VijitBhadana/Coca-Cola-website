export default function Loader() {
  return (
    <div
      id="loader"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-[24px] bg-black [transition:opacity_0.8s_ease] [&.done]:pointer-events-none [&.done]:opacity-0"
    >
      <div className="font-display text-[34px] uppercase tracking-[0.06em] text-red">Coca-Cola</div>
      <div className="h-[2px] w-[180px] overflow-hidden bg-[rgba(244,0,9,0.22)]">
        <i id="loadbar" className="block h-full w-0 bg-red [transition:width_0.2s_ease]" />
      </div>
    </div>
  );
}
