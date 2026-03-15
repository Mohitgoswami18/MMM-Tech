import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import StockCard from "./StockCard";

const COMPANIES = [
  {
    id: "1",
    name: "NeuroVision AI",
    symbol: "NVAI",
    initialPrice: 45.5,
  },
  {
    id: "2",
    name: "RoboMind Labs",
    symbol: "RMND",
    initialPrice: 62.3,
  },
  {
    id: "3",
    name: "QuantumBrain Tech",
    symbol: "QBT",
    initialPrice: 38.75,
  },
];

export default function TradingGame() {
  const [balance, setBalance] = useState(1000);
  const [positions, setPositions] = useState([]);
  const [stocks, setStocks] = useState(
    COMPANIES.map((company) => ({
      ...company,
      price: company.initialPrice,
      priceHistory: [company.initialPrice],
      changePercent: 0,
    })),
  );

  const [buyDialog, setBuyDialog] = useState({
    isOpen: false,
    stockId: null,
    shares: 1,
  });

  const [sellDialog, setSellDialog] = useState({
    isOpen: false,
    stockId: null,
    shares: 1,
  });

  // simulate stock price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = (Math.random() - 0.48) * 5;
          const newPrice = Math.max(stock.price + change, 1);
          const changePercent = ((newPrice - stock.price) / stock.price) * 100;

          return {
            ...stock,
            price: newPrice,
            priceHistory: [...stock.priceHistory.slice(-19), newPrice],
            changePercent,
          };
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const portfolioValue = positions.reduce((sum, pos) => {
    const stock = stocks.find((s) => s.id === pos.stockId);
    return sum + (stock ? stock.price * pos.shares : 0);
  }, 0);

  const totalValue = balance + portfolioValue;
  const profitLoss = totalValue - 1000;
  const profitLossPercent = (profitLoss / 1000) * 100;

  const handleBuy = (stockId) => {
    setBuyDialog({ isOpen: true, stockId, shares: 1 });
  };

  const handleSell = (stockId) => {
    const position = positions.find((p) => p.stockId === stockId);
    if (position) {
      setSellDialog({ isOpen: true, stockId, shares: 1 });
    }
  };

  const confirmBuy = () => {
    const stock = stocks.find((s) => s.id === buyDialog.stockId);
    const cost = stock.price * buyDialog.shares;

    if (cost > balance) return;

    setBalance(balance - cost);

    setPositions((prev) => {
      const existing = prev.find((p) => p.stockId === buyDialog.stockId);

      if (existing) {
        return prev.map((p) =>
          p.stockId === buyDialog.stockId
            ? { ...p, shares: p.shares + buyDialog.shares }
            : p,
        );
      }

      return [
        ...prev,
        {
          stockId: buyDialog.stockId,
          shares: buyDialog.shares,
          boughtAtPrice: stock.price,
        },
      ];
    });

    setBuyDialog({ isOpen: false, stockId: null, shares: 1 });
  };

  const confirmSell = () => {
    const stock = stocks.find((s) => s.id === sellDialog.stockId);
    const position = positions.find((p) => p.stockId === sellDialog.stockId);

    const proceeds = stock.price * sellDialog.shares;

    setBalance(balance + proceeds);

    setPositions((prev) =>
      prev
        .map((p) =>
          p.stockId === sellDialog.stockId
            ? { ...p, shares: p.shares - sellDialog.shares }
            : p,
        )
        .filter((p) => p.shares > 0),
    );

    setSellDialog({ isOpen: false, stockId: null, shares: 1 });
  };

  return (
    <div className="space-y-8">
      {/* Dashboard */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Cash Balance</p>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>

        <div className="bg-purple-500 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Portfolio Value</p>
          <p className="text-3xl font-bold">${portfolioValue.toFixed(2)}</p>
        </div>

        <div
          className={`rounded-2xl p-6 shadow-lg text-white ${
            profitLoss >= 0 ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="text-sm opacity-80">Total Value</p>
          <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>

          <div className="flex items-center gap-1 text-xs mt-1">
            {profitLoss >= 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {profitLoss >= 0 ? "+" : ""}
            {profitLoss.toFixed(2)} ({profitLossPercent.toFixed(1)}%)
          </div>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stocks.map((stock) => {
          const position = positions.find((p) => p.stockId === stock.id);

          return (
            <StockCard
              key={stock.id}
              stock={stock}
              position={position}
              onBuy={() => handleBuy(stock.id)}
              onSell={() => handleSell(stock.id)}
            />
          );
        })}
      </div>

      {/* Buy Modal */}
      {buyDialog.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Buy Shares</h2>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                className="p-2 border rounded"
                onClick={() =>
                  setBuyDialog((p) => ({
                    ...p,
                    shares: Math.max(1, p.shares - 1),
                  }))
                }
              >
                <Minus size={16} />
              </button>

              <span className="text-xl font-bold">{buyDialog.shares}</span>

              <button
                className="p-2 border rounded"
                onClick={() =>
                  setBuyDialog((p) => ({
                    ...p,
                    shares: p.shares + 1,
                  }))
                }
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                className="border px-4 py-2 rounded w-full"
                onClick={() =>
                  setBuyDialog({ isOpen: false, stockId: null, shares: 1 })
                }
              >
                Cancel
              </button>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                onClick={confirmBuy}
              >
                Confirm Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
