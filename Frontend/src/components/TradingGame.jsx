


import { useState, useEffect, useCallback } from "react";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  RefreshCw,
  Wifi,
  WifiOff,
  Activity,
  DollarSign,
  BarChart2,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "../supabaseClient";

const FINNHUB_API_KEY = "d77jp0hr01qp6aflsjg0d77jp0hr01qp6aflsjgg";
const FINNHUB_BASE = "https://finnhub.io/api/v1";
const STARTING_BALANCE = 100000;

const COMPANIES = [
  { id: "AAPL", symbol: "AAPL", name: "Apple Inc." },
  { id: "TSLA", symbol: "TSLA", name: "Tesla Inc." },
  { id: "MSFT", symbol: "MSFT", name: "Microsoft Corp." },
];

// ─── API HELPERS ───────────────────────────────────────────────────────────────
async function fetchQuote(symbol) {
  const res = await fetch(
    `${FINNHUB_BASE}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
  );
  if (!res.ok) throw new Error(`Quote fetch failed for ${symbol}`);
  const data = await res.json();
  return {
    current: data.c,
    change: data.d,
    changePercent: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    prevClose: data.pc,
  };
}

async function fetchCandles(symbol) {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 90 * 24 * 60 * 60;
  const res = await fetch(
    `${FINNHUB_BASE}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`,
  );
  if (!res.ok) throw new Error(`Candle fetch failed for ${symbol}`);
  const data = await res.json();
  if (data.s !== "ok" || !data.c?.length) return null;
  return data.c.map((price, i) => ({
    price: Number(price.toFixed(2)),
    time: new Date(data.t[i] * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));
}

function buildFallbackHistory(quote) {
  if (!quote?.current) return [];
  const { prevClose, open, low, high, current } = quote;
  return [
    { price: Number((prevClose ?? current * 0.99).toFixed(2)), time: "Prev" },
    { price: Number((open ?? current).toFixed(2)), time: "Open" },
    { price: Number((low ?? current * 0.995).toFixed(2)), time: "Low" },
    { price: Number((high ?? current * 1.005).toFixed(2)), time: "High" },
    { price: Number(current.toFixed(2)), time: "Now" },
  ];
}

// ─── STOCK CARD ────────────────────────────────────────────────────────────────
function StockCard({ stock, position, onBuy, onSell, isLoading }) {
  const isPositive = stock.changePercent >= 0;
  const currentValue = position ? stock.current * position.shares : 0;
  const purchaseValue = position ? position.boughtAtPrice * position.shares : 0;
  const gainLoss = currentValue - purchaseValue;
  const gainLossPercent =
    purchaseValue > 0 ? (gainLoss / purchaseValue) * 100 : 0;

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col bg-linear-to-br from-white to-gray-50 border">
      <div className="bg-linear-to-r from-blue-50 to-purple-50 p-5 border-b">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className="text-sm text-gray-500">{stock.name}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {isPositive ? "+" : ""}
              {stock.changePercent?.toFixed(2)}%
            </div>
            {isLoading && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> updating
              </span>
            )}
          </div>
        </div>
        <p className="text-3xl font-bold">${stock.current?.toFixed(2)}</p>
        <div className="flex gap-3 mt-1 text-xs text-gray-500">
          <span>H: ${stock.high?.toFixed(2)}</span>
          <span>L: ${stock.low?.toFixed(2)}</span>
          <span>O: ${stock.open?.toFixed(2)}</span>
        </div>
        {position && (
          <p className="text-xs text-gray-400 mt-1">
            Avg. buy: ${position.boughtAtPrice?.toFixed(2)}
          </p>
        )}
      </div>

      <div className="h-40 bg-white/50 px-1 pt-2">
        {stock.priceHistory?.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stock.priceHistory}>
              <XAxis dataKey="time" hide />
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                formatter={(v) => [`$${v}`, "Price"]}
                labelFormatter={(l) => l}
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
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            <Activity className="w-4 h-4 mr-2" />
            Loading chart…
          </div>
        )}
      </div>

      {position && (
        <div className="bg-blue-50 border-t p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shares Owned:</span>
              <span className="font-bold">{position.shares}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Value:</span>
              <span className="font-bold">${currentValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Gain / Loss:</span>
              <span
                className={`font-bold ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {gainLoss >= 0 ? "+" : ""}
                {gainLoss.toFixed(2)} ({gainLossPercent >= 0 ? "+" : ""}
                {gainLossPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      )}

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
          className={`w-full py-2 rounded-lg font-medium border transition ${position ? "border-gray-300 hover:bg-gray-100" : "border-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

// ─── TRADE MODAL ───────────────────────────────────────────────────────────────
function TradeModal({
  type,
  stock,
  shares,
  balance,
  position,
  onSharesChange,
  onConfirm,
  onCancel,
  isTrading,
}) {
  const isBuy = type === "BUY";
  const cost = stock ? stock.current * shares : 0;
  const maxSell = position?.shares ?? 0;
  const canConfirm = isBuy
    ? cost <= balance && shares > 0
    : shares <= maxSell && shares > 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
        <h2 className="text-xl font-bold mb-1">
          {isBuy ? "Buy" : "Sell"} {stock?.symbol}
        </h2>
        <p className="text-gray-500 text-sm mb-4">{stock?.name}</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Current Price</span>
            <span className="font-semibold">${stock?.current?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">
              {isBuy ? "Total Cost" : "Proceeds"}
            </span>
            <span className="font-semibold">${cost.toFixed(2)}</span>
          </div>
          {isBuy && (
            <div className="flex justify-between">
              <span className="text-gray-500">Balance After</span>
              <span
                className={`font-semibold ${balance - cost < 0 ? "text-red-500" : "text-green-600"}`}
              >
                ${(balance - cost).toFixed(2)}
              </span>
            </div>
          )}
          {!isBuy && (
            <div className="flex justify-between">
              <span className="text-gray-500">Shares Available</span>
              <span className="font-semibold">{maxSell}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mb-5">
          <button
            className="p-2 border rounded-lg hover:bg-gray-100 transition"
            onClick={() => onSharesChange(Math.max(1, shares - 1))}
            disabled={isTrading}
          >
            <Minus size={16} />
          </button>
          <div className="text-center">
            <p className="text-3xl font-bold">{shares}</p>
            <p className="text-xs text-gray-400">shares</p>
          </div>
          <button
            className="p-2 border rounded-lg hover:bg-gray-100 transition"
            onClick={() =>
              onSharesChange(isBuy ? shares + 1 : Math.min(maxSell, shares + 1))
            }
            disabled={isTrading}
          >
            <Plus size={16} />
          </button>
        </div>

        {isBuy && cost > balance && (
          <p className="text-red-500 text-xs text-center mb-3">
            ⚠ Insufficient balance
          </p>
        )}

        <div className="flex gap-3">
          <button
            className="border px-4 py-2 rounded-lg w-full hover:bg-gray-50 transition"
            onClick={onCancel}
            disabled={isTrading}
          >
            Cancel
          </button>
          <button
            disabled={!canConfirm || isTrading}
            className={`px-4 py-2 rounded-lg w-full text-white font-medium transition ${isBuy ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"} disabled:opacity-40 disabled:cursor-not-allowed`}
            onClick={onConfirm}
          >
            {isTrading ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing…
              </span>
            ) : (
              `Confirm ${isBuy ? "Buy" : "Sell"}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
// userId is passed as a prop from StockSimulator — no need to fetch it here
export default function TradingGame({ userId }) {
  console.log("🎮 TradingGame rendered with userId:", userId); 
  
  if (!userId) {
    console.warn("⚠️  WARNING: TradingGame received undefined or null userId!");
    console.warn("⚠️  Database operations will not work without a valid userId");
  } else {
    console.log("✅ Valid userId received in TradingGame:", userId);
  }
  
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [positions, setPositions] = useState([]);
  const [isTrading, setIsTrading] = useState(false);
  const [dbLoading, setDbLoading] = useState(true);
  const [tradeError, setTradeError] = useState(null);

  const [stocks, setStocks] = useState(
    COMPANIES.map((c) => ({
      ...c,
      current: null,
      change: 0,
      changePercent: 0,
      high: null,
      low: null,
      open: null,
      prevClose: null,
      priceHistory: [],
    })),
  );
  const [loadingSymbols, setLoadingSymbols] = useState(new Set());
  const [apiConnected, setApiConnected] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [tradeDialog, setTradeDialog] = useState({
    isOpen: false,
    type: "BUY",
    stockId: null,
    shares: 1,
  });

  // ─── LOAD BALANCE + POSITIONS FROM SUPABASE ────────────────────────────────
  const loadUserData = useCallback(async () => {
    // if not logged in, skip DB fetch and just use default balance
    if (!userId) {
      console.log("No userId provided, using default balance");
      setDbLoading(false);
      return;
    }

    console.log("Loading user data for userId:", userId);

    try {
      // fetch balance
      console.log("Fetching trading_accounts for userId:", userId);
      const { data: account, error: accountError } = await supabase
        .from("trading_accounts")
        .select("balance")
        .eq("user_id", userId)
        .single();

      if (accountError) {
        console.error("trading_accounts error:", accountError.message, accountError);
      } else if (account) {
        console.log("Account balance fetched:", account.balance);
        setBalance(Number(account.balance));
      } else {
        console.log("No account found for user, using default balance");
      }

      // fetch positions
      console.log("Fetching positions for userId:", userId);
      const { data: userPositions, error: posError } = await supabase
        .from("positions")
        .select("*")
        .eq("user_id", userId);

      if (posError) {
        console.error("positions error:", posError.message, posError);
      } else if (userPositions && userPositions.length > 0) {
        console.log("Positions fetched:", userPositions);
        setPositions(
          userPositions.map((p) => ({
            stockId: p.symbol,
            shares: Number(p.shares),
            boughtAtPrice: Number(p.avg_cost_basis),
          })),
        );
      } else {
        console.log("No positions found for user");
      }
    } catch (err) {
      console.error("loadUserData failed:", err);
    } finally {
      setDbLoading(false);
    }
  }, [userId]);

  // load on mount — userId comes from parent so this is reliable
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // ─── MARKET DATA ───────────────────────────────────────────────────────────
  const refreshAll = useCallback(async (preserveHistory = false) => {
    setLoadingSymbols(new Set(COMPANIES.map((c) => c.id)));

    const results = await Promise.allSettled(
      COMPANIES.map(async (company) => {
        const [quoteResult, historyResult] = await Promise.allSettled([
          fetchQuote(company.symbol),
          preserveHistory
            ? Promise.resolve(null)
            : fetchCandles(company.symbol),
        ]);

        const quote =
          quoteResult.status === "fulfilled" ? quoteResult.value : null;
        const candleData =
          historyResult.status === "fulfilled" ? historyResult.value : null;

        let history;
        if (preserveHistory) {
          history = null;
        } else if (candleData && candleData.length > 1) {
          history = candleData;
        } else {
          history = buildFallbackHistory(quote);
        }

        return { id: company.id, quote, history };
      }),
    );

    const anySuccess = results.some(
      (r) => r.status === "fulfilled" && r.value.quote !== null,
    );

    setStocks((prev) =>
      prev.map((stock) => {
        const result = results.find(
          (r) => r.status === "fulfilled" && r.value.id === stock.id,
        );
        if (!result) return stock;
        const { quote, history } = result.value;
        return {
          ...stock,
          ...(quote ?? {}),
          priceHistory: history !== null ? history : stock.priceHistory,
        };
      }),
    );

    setApiConnected(anySuccess);
    setLoadingSymbols(new Set());
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    refreshAll(false);
    const interval = setInterval(() => refreshAll(true), 15000);
    return () => clearInterval(interval);
  }, [refreshAll]);

  // ─── PORTFOLIO CALCULATIONS ────────────────────────────────────────────────
  const portfolioValue = positions.reduce((sum, pos) => {
    const stock = stocks.find((s) => s.id === pos.stockId);
    return sum + (stock?.current ? stock.current * pos.shares : 0);
  }, 0);
  const totalValue = balance + portfolioValue;
  const profitLoss = totalValue - STARTING_BALANCE;
  const profitLossPercent = (profitLoss / STARTING_BALANCE) * 100;

  // ─── TRADE HANDLERS ────────────────────────────────────────────────────────
  const handleBuy = (stockId) => {
    setTradeError(null);
    setTradeDialog({ isOpen: true, type: "BUY", stockId, shares: 1 });
  };

  const handleSell = (stockId) => {
    setTradeError(null);
    const position = positions.find((p) => p.stockId === stockId);
    if (position)
      setTradeDialog({ isOpen: true, type: "SELL", stockId, shares: 1 });
  };

  const confirmTrade = async () => {
    const stock = stocks.find((s) => s.id === tradeDialog.stockId);
    const { type, shares } = tradeDialog;

    console.log("Confirming trade:", { type, symbol: stock?.symbol, shares, userId });

    // if not logged in — still allow playing but warn
    if (!userId) {
      console.warn("User not logged in - trade will not be saved");
      setTradeError("You are not logged in. Trades will not be saved.");
      return;
    }

    setIsTrading(true);
    setTradeError(null);

    try {
      console.log("Calling execute_trade RPC with:", {
        p_user_id: userId,
        p_symbol: stock.symbol,
        p_side: type.toLowerCase(),
        p_shares: shares,
        p_price: stock.current,
      });

      const { data, error } = await supabase.rpc("execute_trade", {
        p_user_id: userId,
        p_symbol: stock.symbol,
        p_side: type.toLowerCase(),
        p_shares: shares,
        p_price: stock.current,
      });

      // log for debugging — remove once confirmed working
      console.log("execute_trade result:", { data, error });

      if (error) {
        console.error("RPC error:", error);
        setTradeError(error.message || "Trade failed");
        return;
      }

      console.log("Trade executed successfully");

      // update balance from DB response
      if (data?.balance !== undefined) {
        console.log("Updating balance to:", data.balance);
        setBalance(Number(data.balance));
      }

      // refresh positions from DB
      console.log("Refreshing positions from database");
      const { data: updatedPositions, error: posError } = await supabase
        .from("positions")
        .select("*")
        .eq("user_id", userId);

      if (posError) {
        console.error("positions refresh error:", posError.message, posError);
      } else {
        console.log("Positions refreshed:", updatedPositions);
        setPositions(
          (updatedPositions ?? []).map((p) => ({
            stockId: p.symbol,
            shares: Number(p.shares),
            boughtAtPrice: Number(p.avg_cost_basis),
          })),
        );
      }

      setTradeDialog({ isOpen: false, type: "BUY", stockId: null, shares: 1 });
    } catch (err) {
      console.error("Trade error:", err);
      setTradeError("Something went wrong. Please try again.");
    } finally {
      setIsTrading(false);
    }
  };

  const activeStock = stocks.find((s) => s.id === tradeDialog.stockId);
  const activePosition = positions.find(
    (p) => p.stockId === tradeDialog.stockId,
  );

  // ─── LOADING STATE ─────────────────────────────────────────────────────────
  if (dbLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-3" />
        <span>Loading your portfolio…</span>
      </div>
    );
  }

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 p-4">
      {/* connection status */}
      <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          {apiConnected === null ? (
            <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
          ) : apiConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
          <span>
            {apiConnected === null
              ? "Connecting to market data…"
              : apiConnected
                ? "Live market data · refreshes every 15s"
                : "API key not set — add your Finnhub key in config"}
          </span>
        </div>
        {lastUpdated && (
          <span className="text-xs text-gray-400">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* balance cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 opacity-70" />
            <p className="text-sm opacity-80">Cash Balance</p>
          </div>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-purple-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-4 h-4 opacity-70" />
            <p className="text-sm opacity-80">Portfolio Value</p>
          </div>
          <p className="text-3xl font-bold">${portfolioValue.toFixed(2)}</p>
        </div>
        <div
          className={`rounded-2xl p-6 shadow-lg text-white ${profitLoss >= 0 ? "bg-green-500" : "bg-red-500"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {profitLoss >= 0 ? (
              <TrendingUp className="w-4 h-4 opacity-70" />
            ) : (
              <TrendingDown className="w-4 h-4 opacity-70" />
            )}
            <p className="text-sm opacity-80">Total Value</p>
          </div>
          <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
          <p className="text-xs mt-1 opacity-80">
            {profitLoss >= 0 ? "+" : ""}
            {profitLoss.toFixed(2)} ({profitLossPercent.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* stock cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stocks.map((stock) => {
          const position = positions.find((p) => p.stockId === stock.id);
          return (
            <StockCard
              key={stock.id}
              stock={stock}
              position={position}
              isLoading={loadingSymbols.has(stock.id)}
              onBuy={() => handleBuy(stock.id)}
              onSell={() => handleSell(stock.id)}
            />
          );
        })}
      </div>

      {/* error toast */}
      {tradeError && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm z-50 cursor-pointer"
          onClick={() => setTradeError(null)}
        >
          ⚠ {tradeError} · click to dismiss
        </div>
      )}

      {/* trade modal */}
      {tradeDialog.isOpen && activeStock && (
        <TradeModal
          type={tradeDialog.type}
          stock={activeStock}
          shares={tradeDialog.shares}
          balance={balance}
          position={activePosition}
          isTrading={isTrading}
          onSharesChange={(n) =>
            setTradeDialog((prev) => ({ ...prev, shares: n }))
          }
          onConfirm={confirmTrade}
          onCancel={() => {
            setTradeError(null);
            setTradeDialog({
              isOpen: false,
              type: "BUY",
              stockId: null,
              shares: 1,
            });
          }}
        />
      )}
    </div>
  );
}