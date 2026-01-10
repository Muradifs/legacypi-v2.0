import { Shield, Heart, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl w-full space-y-8 mt-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-yellow-500">About Us</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          LegacyPi is a vision of a decentralized future for humanitarian work, powered by the strength of the Pi Network community.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
          <div className="inline-flex p-3 rounded-full bg-yellow-500/10 mb-4">
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Security</h3>
          <p className="text-slate-500">
            All donations are secured via blockchain technology and transparent smart contracts.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
          <div className="inline-flex p-3 rounded-full bg-red-500/10 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Humanity</h3>
          <p className="text-slate-500">
            We focus on direct aid to those who need it most, without intermediaries.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
          <div className="inline-flex p-3 rounded-full bg-blue-500/10 mb-4">
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-slate-500">
            Pioneers decide. Every donor has a voting right in directing the funds.
          </p>
        </div>
      </div>
    </div>
  );
}