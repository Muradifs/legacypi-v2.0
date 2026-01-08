"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Heart, Users, Trophy, X, Lightbulb, ThumbsUp, Lock, Map, Share2, Copy, Check, AlertCircle } from "lucide-react"

// --- INTERNE KOMPONENTE (Rješenje za problem s importima) ---
const Button = ({ className, variant = "default", size = "default", children, ...props }: any) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-yellow-500 text-black hover:bg-yellow-400",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }
  const sizes = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10",
  }
  // @ts-ignore
  const variantStyles = variants[variant] || variants.default
  // @ts-ignore
  const sizeStyles = sizes[size] || sizes.default

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ className, children }: any) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
)

const VAULT_ADDRESS = "GAGQPTC6QEFQRB6ZNHUOLLO6HCFDPVVA63IDCQ62GCUG6GFXKALKXGFF"

declare global {
  interface Window {
    Pi: any
  }
}

// --- LOGO ---
const LegacyPiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#2E0A36" stroke="#FBBF24" strokeWidth="2" />
    <path d="M50 25V75M35 25H65" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
    <path d="M35 25C35 25 35 45 25 55" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
    <path d="M65 25C65 25 65 45 75 55" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 55C50 55 40 65 40 80H60C60 65 50 55 50 55Z" fill="#FBBF24" fillOpacity="0.3" />
  </svg>
)

const BADGE_TIERS = [
  {
    id: 1,
    name: "Bronze Guardian",
    threshold: 1,
    color: "text-orange-400",
    bg: "bg-orange-400/20",
    border: "border-orange-400/50",
  },
  {
    id: 2,
    name: "Silver Keeper",
    threshold: 100,
    color: "text-gray-300",
    bg: "bg-gray-300/20",
    border: "border-gray-300/50",
  },
  {
    id: 3,
    name: "Gold Visionary",
    threshold: 1000,
    color: "text-yellow-400",
    bg: "bg-yellow-400/20",
    border: "border-yellow-400/50",
  },
  {
    id: 4,
    name: "Diamond Legacy",
    threshold: 10000,
    color: "text-cyan-400",
    bg: "bg-cyan-400/20",
    border: "border-cyan-400/50",
  },
]

const ROADMAP_STEPS = [
  {
    year: "2025",
    title: "Genesis Launch",
    description: "LegacyPi App launch. Initial community pledges begin.",
    status: "current",
  },
  { year: "2026", title: "First Audit", description: "Public review of the Vault holdings.", status: "upcoming" },
  { year: "2028", title: "Test Vote", description: "Trial run of the DAO voting system.", status: "upcoming" },
  { year: "2030", title: "THE UNLOCK", description: "Consensus Day. Funds released.", status: "locked" },
]

export default function LegacyPiPage() {
  // Auth & User State
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Data State
  const [userStats, setUserStats] = useState({ totalDonated: 0, donations: [] as any[] })
  const [impactData, setImpactData] = useState({ totalLocked: 0, donorsCount: 0 })

  // UI State
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 })
  const [slidePosition, setSlidePosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [copied, setCopied] = useState(false)

  // Modals
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showProposals, setShowProposals] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showShare, setShowShare] = useState(false)

  // Lists
  const [donorsList, setDonorsList] = useState<any[]>([])
  const [proposalsList, setProposalsList] = useState<any[]>([
    {
      id: 1,
      title: "Global Pi Education Fund",
      recipient: "Verified NGOs",
      amount: "100% of Vault",
      description: "Building schools in developing regions accepting Pi for tuition.",
      votes: 0,
      category: "Education",
    },
  ])

  const [piSdkState, setPiSdkState] = useState<"loading" | "ready" | "failed">("loading")
  const [sdkError, setSdkError] = useState<string>("")
  const sliderRef = useRef<HTMLDivElement>(null)

  // --- 1. INITIALIZATION (REAL PI SDK) ---
  useEffect(() => {
    console.log("[v0] LegacyPi: Starting Pi SDK initialization...")

    const initializePi = async () => {
      if (typeof window === "undefined") {
        console.log("[v0] LegacyPi: Window not available yet")
        return
      }

      let attempts = 0
      const maxAttempts = 10

      const checkPiSDK = setInterval(() => {
        attempts++
        console.log(`[v0] LegacyPi: Checking for Pi SDK... Attempt ${attempts}/${maxAttempts}`)

        if (window.Pi) {
          clearInterval(checkPiSDK)
          try {
            console.log("[v0] LegacyPi: Pi SDK found, initializing...")
            window.Pi.init({ version: "2.0", sandbox: true })
            setPiSdkState("ready")
            console.log("[v0] LegacyPi: ✅ Pi SDK Successfully Initialized")
          } catch (e: any) {
            console.error("[v0] LegacyPi: SDK Init Error", e)
            setPiSdkState("failed")
            setSdkError(e?.message || "SDK initialization failed")
          }
        } else if (attempts >= maxAttempts) {
          clearInterval(checkPiSDK)
          console.warn("[v0] LegacyPi: ❌ Pi Browser not detected after 10 attempts")
          setPiSdkState("failed")
          setSdkError("Pi Browser not detected. Please use the Pi Browser app.")
        }
      }, 500)
    }

    initializePi()
  }, [])

  // --- 2. AUTHENTICATION ---
  const onIncompletePaymentFound = (payment: any) => {
    console.log("[v0] LegacyPi: Incomplete payment found:", payment.identifier)
    fetch("/api/pi/incomplete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: payment.identifier }),
    }).catch((e) => console.error("[v0] Incomplete payment handling failed", e))
  }

  const connectWallet = async () => {
    console.log("[v0] LegacyPi: Connect wallet clicked, SDK state:", piSdkState)

    if (piSdkState !== "ready") {
      console.error("[v0] LegacyPi: SDK not ready, state:", piSdkState)
      alert("Pi SDK is not ready yet. Please wait or refresh the page.")
      return
    }

    if (!window.Pi) {
      console.error("[v0] LegacyPi: window.Pi is not available")
      alert("Pi SDK is not available. Please use Pi Browser.")
      return
    }

    try {
      console.log("[v0] LegacyPi: Starting authentication...")
      const scopes = ["username", "payments"]
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound)

      console.log("[v0] LegacyPi: ✅ Authentication successful", authResult)
      setUser(authResult.user)
      setIsAuthenticated(true)
    } catch (err: any) {
      console.error("[v0] LegacyPi: ❌ Auth Error:", err)
      alert(`Authentication error: ${err.message || "Unknown error"}`)
    }
  }

  // --- 3. PAYMENT LOGIC (REAL) ---
  const handleDonation = async () => {
    console.log("[v0] LegacyPi: Donation initiated, authenticated:", isAuthenticated)

    if (!user) {
      console.log("[v0] LegacyPi: User not authenticated, triggering wallet connect...")
      await connectWallet()
      if (!window.Pi?.auth?.user) {
        console.log("[v0] LegacyPi: Still no user after connect attempt")
        return
      }
    }

    setPaymentStatus("processing")
    console.log("[v0] LegacyPi: Creating payment...")

    try {
      const paymentData = {
        amount: 1,
        memo: "Donation for Pi Legacy 2030",
        metadata: { type: "donation_2030", vault: VAULT_ADDRESS },
      }

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log("[v0] LegacyPi: Payment ready for approval:", paymentId)
          try {
            const res = await fetch("/api/pi/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, amount: paymentData.amount }),
            })
            if (!res.ok) throw new Error("Approval failed")
            console.log("[v0] LegacyPi: ✅ Payment approved")
          } catch (err) {
            console.error("[v0] Server approval error", err)
            throw err
          }
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          console.log("[v0] LegacyPi: Payment ready for completion:", paymentId, txid)
          try {
            const res = await fetch("/api/pi/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            })
            if (!res.ok) throw new Error("Completion failed")

            console.log("[v0] LegacyPi: ✅ Payment completed successfully")
            completeUiSuccess()
          } catch (err) {
            console.error("[v0] Server completion error", err)
            throw err
          }
        },
        onCancel: (paymentId: string) => {
          console.log("[v0] LegacyPi: Payment cancelled:", paymentId)
          setPaymentStatus("idle")
          setSlidePosition(0)
        },
        onError: (error: any, payment: any) => {
          console.error("[v0] Pi Payment Error:", error, payment)
          setPaymentStatus("error")
          setSlidePosition(0)
          setTimeout(() => setPaymentStatus("idle"), 3000)
        },
      }

      await window.Pi.createPayment(paymentData, callbacks)
    } catch (err: any) {
      console.error("[v0] Flow Error:", err)
      setPaymentStatus("idle")
      setSlidePosition(0)
    }
  }

  const completeUiSuccess = () => {
    setPaymentStatus("success")

    setImpactData((prev) => ({
      ...prev,
      totalLocked: prev.totalLocked + 1,
      donorsCount: prev.donorsCount + 1,
    }))

    if (user) {
      setUserStats((prev) => ({
        totalDonated: prev.totalDonated + 1,
        donations: [{ date: new Date().toLocaleDateString(), amount: 1, tx: "COMPLETED" }, ...prev.donations],
      }))

      setDonorsList((prev) => [
        {
          rank: prev.length + 1,
          username: user.username,
          amount: 1,
        },
        ...prev,
      ])
    }

    setTimeout(() => {
      setPaymentStatus("idle")
      setSlidePosition(0)
    }, 4000)
  }

  const handleVote = (id: number) => {
    if (!user) {
      connectWallet()
      return
    }
    setProposalsList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, votes: p.votes + 1 }
        }
        return p
      }),
    )
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(VAULT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const copyInvite = () => {
    navigator.clipboard.writeText(`Join LegacyPi! legacypi.app`)
  }

  // --- UI EFFECTS ---
  useEffect(() => {
    const targetDate = new Date("2030-01-01T00:00:00").getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      if (distance < 0) {
        clearInterval(interval)
        return
      }
      setCountdown({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const handleMouseMove = (e: MouseEvent) => {
      if (sliderRef.current) moveSlider(e.clientX)
    }
    const handleMouseUp = () => endDrag()
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const moveSlider = (clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const pos = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const pct = (pos / rect.width) * 100
    setSlidePosition(pct)
    if (pct >= 95) {
      setIsDragging(false)
      handleDonation()
    }
  }

  const endDrag = () => {
    setIsDragging(false)
    if (slidePosition < 95) setSlidePosition(0)
  }
  const handleTouchStart = () => setIsDragging(true)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) moveSlider(e.touches[0].clientX)
  }

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }))

  return (
    <div className="min-h-screen bg-[#1a0b2e] relative overflow-hidden text-white font-sans flex flex-col">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-yellow-500/40 rounded-full animate-float"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {piSdkState === "loading" && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          Loading Pi SDK...
        </div>
      )}

      {piSdkState === "failed" && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2 max-w-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{sdkError || "Pi SDK is not available"}</span>
        </div>
      )}

      {/* --- LEADERBOARD MODAL --- */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2E0A36] w-full max-w-lg h-[80vh] rounded-2xl border border-yellow-500/30 flex flex-col shadow-2xl relative">
            <div className="p-6 border-b border-yellow-500/20 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Hall of Fame</h2>
              <button onClick={() => setShowLeaderboard(false)} className="p-2">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {donorsList.length === 0 ? (
                <div className="text-center text-gray-500 py-10 flex flex-col items-center">
                  <Trophy className="w-12 h-12 mb-4 opacity-20" />
                  <p>Waiting for the blockchain...</p>
                  <p className="text-xs mt-2 text-yellow-500/50">Be the first to pledge 1 Pi!</p>
                </div>
              ) : (
                donorsList.map((donor, idx) => (
                  <div key={idx} className="flex justify-between p-3 border border-white/5 rounded bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-yellow-500">#{idx + 1}</span>
                      <span>{donor.username}</span>
                    </div>
                    <span className="text-yellow-500 font-mono">{donor.amount} Pi</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- PROPOSALS MODAL --- */}
      {showProposals && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2E0A36] w-full max-w-lg h-[80vh] rounded-2xl border border-yellow-500/30 flex flex-col shadow-2xl relative p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Visions</h2>
              <button onClick={() => setShowProposals(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto h-full pb-10">
              {proposalsList.map((p) => (
                <div key={p.id} className="border border-white/10 p-4 rounded bg-white/5">
                  <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">{p.category}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{p.description}</p>
                  <Button
                    onClick={() => handleVote(p.id)}
                    className="w-full mt-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" /> Vote ({p.votes})
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- ROADMAP MODAL --- */}
      {showRoadmap && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2E0A36] w-full max-w-lg h-[80vh] rounded-2xl border border-yellow-500/30 flex flex-col shadow-2xl relative p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Timeline</h2>
              <button onClick={() => setShowRoadmap(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-6 overflow-y-auto h-full pb-10">
              {ROADMAP_STEPS.map((s, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div
                    className={`text-sm font-bold w-12 pt-1 ${s.status === "current" ? "text-yellow-500" : "text-gray-500"}`}
                  >
                    {s.year}
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full z-10 ${s.status === "current" ? "bg-yellow-500 animate-pulse" : s.status === "locked" ? "bg-red-900" : "bg-gray-700"}`}
                    ></div>
                    {i !== ROADMAP_STEPS.length - 1 && <div className="w-0.5 h-full bg-white/10 absolute top-3"></div>}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className={`font-bold ${s.status === "current" ? "text-white" : "text-gray-400"}`}>
                      {s.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- SHARE MODAL --- */}
      {showShare && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2E0A36] w-full max-w-sm rounded-2xl border border-yellow-500/30 p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Invite Friends</h2>
            <Button onClick={copyInvite} className="w-full bg-yellow-500 text-black">
              Copy Link
            </Button>
            <Button onClick={() => setShowShare(false)} variant="ghost" className="w-full mt-2">
              Close
            </Button>
          </div>
        </div>
      )}

      {/* --- PROFILE MODAL --- */}
      {showProfile && user && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2E0A36] w-full max-w-lg h-[80vh] rounded-2xl border border-yellow-500/30 p-6 flex flex-col relative">
            <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4">
              <X />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
                <Users className="text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold">@{user.username}</h2>
              <p className="text-xs text-gray-500">UID: {user.uid.substring(0, 8)}...</p>
            </div>
            <div className="space-y-4 overflow-y-auto">
              <div className="bg-white/5 p-4 rounded text-center">
                <div className="text-gray-400 text-sm">Total Pledged</div>
                <div className="text-2xl font-bold text-yellow-500">{userStats.totalDonated} Pi</div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Badges</h3>
                <div className="grid grid-cols-2 gap-2">
                  {BADGE_TIERS.map((b) => (
                    <div
                      key={b.id}
                      className={`p-2 border rounded text-center text-xs ${userStats.totalDonated >= b.threshold ? "border-yellow-500 text-yellow-500" : "border-gray-700 text-gray-700"}`}
                    >
                      {b.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SUCCESS OVERLAY --- */}
      {paymentStatus === "success" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="text-center p-8 bg-[#2E0A36] border border-yellow-500 rounded-2xl max-w-sm mx-4">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
              <Check className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-400 text-sm">Your pledge has been recorded on the blockchain</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-20 p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <LegacyPiLogo className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold">LegacyPi</h1>
            <p className="text-xs text-gray-400">The 2030 Vault</p>
          </div>
        </div>
        {!isAuthenticated ? (
          <Button
            onClick={connectWallet}
            size="default"
            className="bg-yellow-500 text-black hover:bg-yellow-400"
            disabled={piSdkState !== "ready"}
          >
            {piSdkState === "loading" ? "Loading..." : piSdkState === "failed" ? "SDK Error" : "Connect"}
          </Button>
        ) : (
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">@{user.username}</span>
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 space-y-8">
        {/* Heart Treasury */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-pulse-slow blur-xl"></div>
          <div className="relative w-40 h-40 rounded-full border-4 border-yellow-500/50 flex items-center justify-center animate-breathe bg-[#2E0A36]/80 backdrop-blur-sm">
            <div className="text-center">
              <Heart className="w-12 h-12 text-yellow-500 mx-auto mb-2 fill-yellow-500/20" />
              <div className="text-3xl font-bold text-yellow-500">{impactData.totalLocked}</div>
              <div className="text-xs text-gray-400">Pi Locked</div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-md">
          <p className="text-lg text-gray-300 font-light">Help Potential</p>
          <h2 className="text-3xl font-bold text-yellow-500">Enormous</h2>
        </div>

        {/* Countdown */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Unlock in</p>
          <div className="flex gap-4 justify-center font-mono text-2xl">
            <div>
              <span className="text-yellow-500">{countdown.days}</span>
              <span className="text-xs text-gray-500 ml-1">d</span>
            </div>
            <div>
              <span className="text-yellow-500">{countdown.hours}</span>
              <span className="text-xs text-gray-500 ml-1">h</span>
            </div>
            <div>
              <span className="text-yellow-500">{countdown.minutes}</span>
              <span className="text-xs text-gray-500 ml-1">m</span>
            </div>
          </div>
        </div>

        {/* Donate Slider */}
        <div className="w-full max-w-md">
          <div
            ref={sliderRef}
            className="relative h-16 bg-white/5 rounded-full border border-yellow-500/30 overflow-hidden cursor-pointer"
            onMouseDown={handleTouchStart}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={endDrag}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 transition-all duration-150"
              style={{ width: `${slidePosition}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-medium text-gray-400">
                {paymentStatus === "processing"
                  ? "Processing..."
                  : paymentStatus === "success"
                    ? "Success!"
                    : paymentStatus === "error"
                      ? "Error - Try Again"
                      : "Slide to Donate 1 Pi"}
              </span>
            </div>
            <div
              className="absolute top-2 left-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-transform duration-150"
              style={{ transform: `translateX(${slidePosition * 4}px)` }}
            >
              <Heart className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-left"
          >
            <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">{impactData.donorsCount}</div>
            <div className="text-xs text-gray-500">Donors</div>
          </button>
          <button
            onClick={() => setShowRoadmap(true)}
            className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-left"
          >
            <Map className="w-6 h-6 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">2030</div>
            <div className="text-xs text-gray-500">Timeline</div>
          </button>
        </div>

        {/* Vault Address */}
        <div className="w-full max-w-md bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Vault Address</span>
            </div>
            <button
              onClick={copyAddress}
              className="text-xs text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="font-mono text-xs text-gray-400 break-all bg-black/30 p-2 rounded">{VAULT_ADDRESS}</div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="relative z-20 border-t border-white/10 bg-[#1a0b2e]/80 backdrop-blur-sm">
        <div className="flex justify-around items-center p-4">
          <button
            onClick={() => setShowProposals(true)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <Lightbulb className="w-6 h-6" />
            <span className="text-xs">Visions</span>
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Leaders</span>
          </button>
          <button
            onClick={() => setShowRoadmap(true)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Roadmap</span>
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-xs">Share</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#1a0b2e]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <LegacyPiLogo className="w-6 h-6" />
              <span className="text-sm text-gray-400">© 2026 LegacyPi. Decentralized. Community-Driven.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251,191,36,0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251,191,36,0.5);
        }
      `}</style>
    </div>
  )
}
