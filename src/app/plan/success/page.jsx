import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiCheckCircle, FiArrowRight, FiMail, FiHelpCircle } from 'react-icons/fi'
import { getSessionData } from '@/lib/core/session'
import { updateUserPlan } from '@/lib/action/action'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  const user = await getSessionData()
  const userId = user?.id || user?._id

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  
  if (status === 'open') {
    return redirect('/')
  }
  if(status === 'complete'){
    await updateUserPlan(userId)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-amber-500/5 blur-[120px] pointer-events-none" />

     
      <div className="max-w-xl w-full rounded-3xl border border-slate-900 bg-slate-900/40 p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(34,211,238,0.05)] text-center space-y-8 relative z-10 group">
        
        
        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative">
          <FiCheckCircle className="size-14 animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-emerald-500/40 scale-110 animate-ping opacity-20 pointer-events-none" />
        </div>

      
        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
            Payment Received
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
            Welcome to Premium Lifetime!
          </h1>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Your workspace has been successfully upgraded. Thank you for your support!
          </p>
        </div>

        <div className="w-full h-[1px] bg-slate-900" />

        <div className="bg-slate-950/60 rounded-2xl border border-slate-900/80 p-5 text-left space-y-4">
          <div className="flex items-start gap-3">
            <FiMail className="text-cyan-400 size-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmation Sent To</p>
              <p className="text-sm font-semibold text-white mt-0.5 break-all">{customerEmail}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pt-3 border-t border-slate-900/50">
            <FiHelpCircle className="text-amber-400 size-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Need assistance?</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Feel free to reach our priority support team anytime at{' '}
                <a href="mailto:support@yourdomain.com" className="text-amber-300 hover:underline font-medium">
                  support@yourdomain.com
                </a>
              </p>
            </div>
          </div>
        </div>

    
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.01] transition-all duration-300 font-black uppercase tracking-wider cursor-pointer"
          >
            Go to Dashboard
            <FiArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}