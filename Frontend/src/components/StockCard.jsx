import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export default function StockCard({ stock, position, onBuy, onSell }) {
  const chartData = stock.priceHistory.map((price, index) => ({
    index,
    price: Number(price.toFixed(2)),
  }));

  const isPositive = stock.changePercent >= 0;

  const currentValue = position ? stock.price * position.shares : 0;
  const purchaseValue = position ? position.boughtAtPrice * position.shares : 0;
  const gainLoss = currentValue - purchaseValue;
  const gainLossPercent =
    purchaseValue > 0 ? (gainLoss / purchaseValue) * 100 : 0;

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col bg-gradient-to-br from-white to-gray-50 border">

      {/* Header */}
      <div className="bg-linearz-to-r from-blue-100 to-purple-100 p-5 border-b">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className="text-sm text-gray-500">{stock.name}</p>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}

            <span className="text-sm font-medium">
              {isPositive ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>

          {position && (
            <p className="text-xs text-gray-500">
              Bought at ${position.boughtAtPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 bg-white/50">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => `$${value.toFixed(2)}`}
              labelFormatter={() => ""}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Position Info */}
      {position && (
        <div className="bg-blue-50 border-t p-4">
          <div className="space-y-2">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shares Owned:</span>
              <span className="font-bold">{position.shares}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Value:</span>
              <span className="font-bold">
                ${currentValue.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Gain/Loss:</span>

              <span
                className={`font-bold ${
                  gainLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {gainLoss >= 0 ? "+" : ""}
                {gainLoss.toFixed(2)} (
                {gainLossPercent >= 0 ? "+" : ""}
                {gainLossPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="p-4 border-t space-y-2 mt-auto bg-white">

        <button
          onClick={onBuy}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Buy
        </button>

        <button
          onClick={onSell}
          disabled={!position}
          className={`w-full py-2 rounded-lg font-medium border transition
          ${
            position
              ? "border-gray-300 hover:bg-gray-100"
              : "border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Sell
        </button>

      </div>
    </div>
  );
}