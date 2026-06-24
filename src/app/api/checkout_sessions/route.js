import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getSessionData } from '@/lib/core/session'
import toast from 'react-hot-toast'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const user = await getSessionData()
    const userId = user?.id || user?._id

   console.log(user," user")

    // Create Checkout Sessions from body params.
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please login first." }, { status: 401 })
    }
    const session = await stripe.checkout.sessions.create({
    customer_email : user?.email ,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1TkzNTKVBwbUCD0KqxiAlpiN',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/plan/success?session_id={CHECKOUT_SESSION_ID}`,
    });
   
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}