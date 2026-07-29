import { useEffect, useRef, useState } from 'react'

export default function RevenueModal({ isOpen, onClose, orders }) {
  const canvasRef = useRef(null)
  const [period, setPeriod] = useState('all')

  const filterOrdersByPeriod = (ordersList, p) => {
    if (p === 'all') return ordersList
    const now = new Date()
    return ordersList.filter((o) => {
      if (!o.date) return false
      const parts = o.date.split('/')
      if (parts.length < 3) return true
      const [d, m, y] = parts
      const date = new Date(+y, +m - 1, +d)

      if (p === 'day') {
        return date.toDateString() === now.toDateString()
      } else if (p === 'week') {
        const diff = (now - date) / (1000 * 60 * 60 * 24)
        return diff >= 0 && diff < 7
      } else if (p === 'month') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }
      return true
    })
  }

  const filteredOrders = filterOrdersByPeriod(orders, period)
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0)

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const containerWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 500
    const H = 200
    const W = containerWidth || 500

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.height = `${H}px`
    canvas.style.width = '100%'

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    // Mornaco Brand Colors
    const TEAL = '#3cb9a0'
    const TEAL_INK = '#14584b'
    const CREAM = '#f4e7c6'
    const GRID = 'rgba(60, 185, 160, 0.15)'
    const AXIS = 'rgba(28, 48, 73, 0.2)'

    const pL = 55, pR = 20, pT = 20, pB = 38
    const cW = W - pL - pR
    const cH = H - pT - pB

    const sorted = [...filteredOrders].sort((a, b) => {
      const parseTS = (o) => {
        const [d, m, y] = (o.date || '01/01/2026').split('/')
        const [hh, mm] = (o.time || '00:00').split(':')
        return new Date(+y, +m - 1, +d, +hh, +mm).getTime()
      }
      return parseTS(a) - parseTS(b)
    })

    ctx.clearRect(0, 0, W, H)

    if (!sorted.length) {
      ctx.font = '500 13px Nunito Sans, sans-serif'
      ctx.fillStyle = TEAL_INK
      ctx.textAlign = 'center'
      ctx.fillText('Aucune commande enregistrée pour cette période', W / 2, H / 2)
      return
    }

    let cum = 0
    const pts = sorted.map((o, i) => {
      cum += parseFloat(o.total || 0)
      return { i, y: cum, label: o.time || '' }
    })

    const maxY = pts[pts.length - 1].y || 1
    const n = pts.length

    const px = (i) => pL + (n === 1 ? cW / 2 : (i / (n - 1)) * cW)
    const py = (v) => pT + cH - (v / maxY) * cH

    // Grid lines & Y Axis labels
    for (let t = 0; t <= 4; t++) {
      const v = (maxY / 4) * t
      const y = py(v)
      ctx.strokeStyle = GRID
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(pL, y)
      ctx.lineTo(W - pR, y)
      ctx.stroke()

      ctx.font = '600 10px Nunito Sans, sans-serif'
      ctx.fillStyle = TEAL_INK
      ctx.textAlign = 'right'
      ctx.fillText(`${v.toFixed(0)} DT`, pL - 6, y + 3.5)
    }

    // Axes
    ctx.strokeStyle = AXIS
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(pL, pT)
    ctx.lineTo(pL, pT + cH)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pL, pT + cH)
    ctx.lineTo(W - pR, pT + cH)
    ctx.stroke()

    // Gradient Fill
    const grad = ctx.createLinearGradient(0, pT, 0, pT + cH)
    grad.addColorStop(0, 'rgba(60, 185, 160, 0.35)')
    grad.addColorStop(1, 'rgba(60, 185, 160, 0.02)')

    ctx.beginPath()
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(px(i), py(p.y)) : ctx.lineTo(px(i), py(p.y))))
    ctx.lineTo(px(n - 1), pT + cH)
    ctx.lineTo(px(0), pT + cH)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Stroke Line
    ctx.beginPath()
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(px(i), py(p.y)) : ctx.lineTo(px(i), py(p.y))))
    ctx.strokeStyle = TEAL
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.stroke()

    // Dots
    pts.forEach((p) => {
      ctx.beginPath()
      ctx.arc(px(p.i), py(p.y), 4.5, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.strokeStyle = TEAL_INK
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // X Axis Labels
    const step = Math.max(1, Math.ceil(n / 6))
    ctx.font = '600 10px Nunito Sans, sans-serif'
    ctx.fillStyle = TEAL_INK
    ctx.textAlign = 'center'
    pts.forEach((p, i) => {
      if (i % step === 0 || i === n - 1) {
        ctx.fillText(p.label, px(i), pT + cH + 20)
      }
    })
  }, [isOpen, period, filteredOrders])

  if (!isOpen) return null

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <div>
            <h3 className="admin-modal__title">Chiffre d'Affaires</h3>
            <p className="admin-modal__sub">
              Évolution cumulée · <strong>{filteredOrders.length}</strong> commande(s)
            </p>
          </div>
          <button className="admin-modal__close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="rev-period-row">
          {[
            { id: 'all', label: 'Tout' },
            { id: 'month', label: 'Ce mois' },
            { id: 'week', label: '7 jours' },
            { id: 'day', label: "Aujourd'hui" },
          ].map((item) => (
            <button
              key={item.id}
              className={`rev-period-btn ${period === item.id ? 'active' : ''}`}
              onClick={() => setPeriod(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="rev-total-row">
          <span className="rev-total-val">{totalRevenue.toFixed(3)}</span>
          <span className="rev-currency">DT</span>
        </div>

        <div className="rev-canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  )
}
