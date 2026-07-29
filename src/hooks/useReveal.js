import { useEffect } from 'react'

// Révèle les éléments .reveal au scroll (ajoute .in) et s'assure qu'ils sont visibles après retour de l'admin
export function useReveal(trigger) {
  useEffect(() => {
    const revealAll = () => {
      const els = document.querySelectorAll('.reveal')
      els.forEach((el) => el.classList.add('in'))
    }

    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal')
      if (!('IntersectionObserver' in window)) {
        revealAll()
        return
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.05 },
      )
      els.forEach((el) => io.observe(el))

      // Backup: reveal everything after 400ms to guarantee zero blank/freeze screen
      const fallbackTimer = setTimeout(revealAll, 400)
      return () => {
        io.disconnect()
        clearTimeout(fallbackTimer)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [trigger])
}
