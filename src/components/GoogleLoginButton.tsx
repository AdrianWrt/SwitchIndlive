'use client'

import { supabase } from '@/lib/supabaseClient'

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button onClick={handleLogin}>
      Continue with Google
    </button>
  )
}