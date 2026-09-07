import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import StatTile from "../components/StatTile";
import Panel from "../components/Panel";
import ListRow from "../components/ListRow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinTrack AI — Your AI Financial Coach Dashboard" },
      {
        name: "description",
        content:
          "FinTrack AI is an AI financial coach: receipt scanning, budget prediction, spending analysis, subscription detection, bill reminders and a monthly financial health score.",
      },
      { property: "og:title", content: "FinTrack AI — Your AI Financial Coach Dashboard" },
      {
        property: "og:description",
        content:
          "Track spending, spot unused subscriptions, get budget predictions and see your monthly financial health score.",
      },
    ],
  }),
  component: Dashboard,
});

// Sample data. Nothing is connected yet — this is only the look of the app.
const tiles = [
  { label: "Rent", amount: "$1410.00", color: "bg-tile-blue" },
  { label: "Transport", amount: "$410.00", color: "bg-tile-pink" },
  { label: "Health", amount: "$325.90", color: "bg-tile-lime" },
  { label: "Groceries", amount: "$290.13", color: "bg-tile-amber" },
];

const insights = [
  "You spent 72% of your monthly budget. Nice pace — keep dining under $200.",
  "Dining out is 38% above your 3-month average this week.",
  "Moving $200 on payday keeps your savings goal on track.",
];

const subscriptions = [
  { name: "Streamly Plus", note: "Entertainment · renews 14 Oct", value: "$15.99" },
  { name: "FitLoop Gym", note: "Fitness · renews 02 Oct", value: "$39.00" },
  { name: "CloudNote", note: "Not opened in 40 days", value: "$7.99" },
];

const bills = [
  { name: "Rent", note: "Due 03 Oct", value: "$1450" },
  { name: "Electricity", note: "Due 09 Oct", value: "$88" },
  { name: "Internet", note: "Due 17 Oct", value: "$52" },
];

const investments = [
  { name: "Index Diversify Fund", note: "Balanced · moderate risk", value: "6.4% / yr" },
  { name: "Tech Momentum ETF", note: "Growth · higher risk", value: "11.2% / yr" },
  { name: "Bond Ladder", note: "Income · low risk", value: "4.1% / yr" },
];

const transactions = [
  { name: "Figma", note: "1 day ago", value: "-$300.00" },
  { name: "Payment received", note: "1 day ago", value: "+$490.00" },
  { name: "Webflow", note: "1 day ago", value: "-$41.00" },
  { name: "Airbnb", note: "4 days ago", value: "-$241.65" },
  { name: "Spotify", note: "8 days ago", value: "-$9.00" },
];

function Dashboard() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex gap-6">
        <Sidebar />

        <main className="flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Welcome back, Kim!</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your AI financial coach — October overview
              </p>
            </div>
            <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Scan receipt
            </button>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="space-y-5 xl:col-span-2">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Panel title="Financial health score" action="Read all">
                  <div className="flex items-end gap-4">
                    <p className="text-5xl font-bold">82</p>
                    <p className="pb-2 text-sm text-success">+8 this month</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full w-[82%] rounded-full bg-primary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Strong — savings and cash flow look healthy.
                  </p>
                </Panel>

                <Panel title="Total balance">
                  <p className="text-4xl font-bold">$12,530.00</p>
                  <div className="mt-6 flex gap-8 text-sm">
                    <div>
                      <p className="text-muted-foreground">Money in</p>
                      <p className="mt-1 font-semibold text-success">+$590.00</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Money out</p>
                      <p className="mt-1 font-semibold text-destructive">-$660.13</p>
                    </div>
                  </div>
                </Panel>
              </div>

              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {tiles.map((tile) => (
                  <StatTile
                    key={tile.label}
                    label={tile.label}
                    amount={tile.amount}
                    color={tile.color}
                  />
                ))}
              </div>

              <Panel title="AI spending insights">
                <ul className="space-y-4">
                  {insights.map((text) => (
                    <li key={text} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </Panel>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Panel title="Budget prediction">
                  <p className="text-3xl font-bold">$2,410</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Estimated spending for the next 31 days.
                  </p>
                  <p className="mt-4 text-sm text-warning">
                    Possible $140 overspend on dining by week 5.
                  </p>
                </Panel>

                <Panel title="Detected subscriptions" action="Show more">
                  <div className="space-y-3">
                    {subscriptions.map((item) => (
                      <ListRow key={item.name} {...item} />
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Cancel 1 unused subscription to save $7.99 a month.
                  </p>
                </Panel>
              </div>
            </div>

            <div className="space-y-5">
              <Panel title="Bill reminders">
                <div className="space-y-3">
                  {bills.map((item) => (
                    <ListRow key={item.name} {...item} />
                  ))}
                </div>
              </Panel>

              <Panel title="Investment suggestions">
                <div className="space-y-3">
                  {investments.map((item) => (
                    <ListRow key={item.name} {...item} valueClass="text-success" />
                  ))}
                </div>
              </Panel>

              <Panel title="Latest transactions" action="Show more">
                <div className="space-y-3">
                  {transactions.map((item) => (
                    <ListRow
                      key={item.name}
                      {...item}
                      valueClass={
                        item.value.startsWith("+") ? "text-success" : "text-destructive"
                      }
                    />
                  ))}
                </div>
              </Panel>

              <Panel title="Voice assistant">
                <p className="text-sm text-muted-foreground">
                  Ask things like "How much did I spend on food?"
                </p>
                <button className="mt-4 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                  Hold to speak
                </button>
              </Panel>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
