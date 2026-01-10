import { TrendingUp, FileText, Users } from "lucide-react";

export default function TransparencyPage() {
  return (
    <div className="max-w-4xl w-full space-y-8 mt-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-yellow-500">Transparency</h1>
        <p className="text-slate-400 text-lg">
          A public registry of all fund transactions and decisions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Raised</p>
            <p className="text-2xl font-bold text-yellow-500">0.00 π</p>
          </div>
          <TrendingUp className="w-8 h-8 text-slate-700" />
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Donors</p>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <Users className="w-8 h-8 text-slate-700" />
        </div>
      </div>

      {/* Table (Placeholder) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" /> 
            Recent Transactions
          </h3>
        </div>
        <div className="p-8 text-center text-slate-500">
          No transactions recorded on the blockchain yet.
        </div>
      </div>
    </div>
  );
}