// One row inside a list (a subscription, a bill or a transaction).
type ListRowProps = {
  name: string;
  note: string;
  value: string;
  valueClass?: string;
};

function ListRow({ name, note, value, valueClass = "" }: ListRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
      <p className={`text-sm font-semibold ${valueClass}`}>{value}</p>
    </div>
  );
}

export default ListRow;
