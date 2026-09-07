// Simple left sidebar. No functionality yet — just the look.
function Sidebar() {
  const items = ["Home", "Cards", "History", "Alerts", "Goals"];

  return (
    <aside className="hidden w-24 shrink-0 flex-col items-center gap-6 rounded-3xl bg-card py-6 md:flex">
      <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        FT
      </div>

      <nav className="flex flex-col items-center gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex w-16 flex-col items-center gap-1 rounded-2xl bg-secondary px-2 py-3 text-[10px] text-muted-foreground"
          >
            <span className="size-2 rounded-full bg-muted-foreground" />
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
