// A small colored tile that shows one spending category.
type StatTileProps = {
  label: string;
  amount: string;
  color: string;
};

function StatTile({ label, amount, color }: StatTileProps) {
  return (
    <div className={`rounded-3xl p-5 text-tile-foreground ${color}`}>
      <div className="flex size-9 items-center justify-center rounded-full bg-tile-foreground/10 text-xs font-bold">
        {label.slice(0, 1)}
      </div>
      <p className="mt-6 text-2xl font-bold">{amount}</p>
      <p className="text-sm opacity-70">{label}</p>
    </div>
  );
}

export default StatTile;
