import { useState } from 'react'
import { addUser, deleteUser, getUsers } from '../../services/adminService.js'

export default function UsersModal({ isOpen, onClose, currentUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [errorMsg, setErrorMsg] = useState('')
  const [usersList, setUsersList] = useState(getUsers())

  if (!isOpen) return null

  const handleAddUser = (e) => {
    e.preventDefault()
    setErrorMsg('')
    const u = username.trim()
    const p = password.trim()

    if (!u) {
      setErrorMsg('Identifiant requis.')
      return
    }
    if (p.length < 4) {
      setErrorMsg('Le mot de passe doit comporter au moins 4 caractères.')
      return
    }

    try {
      const updated = addUser(u, p, role)
      setUsersList(updated)
      setUsername('')
      setPassword('')
      setRole('admin')
    } catch (err) {
      setErrorMsg(err.message || 'Erreur lors de l’ajout.')
    }
  }

  const handleDeleteUser = (userId) => {
    if (confirm('Retirer cet utilisateur admin ?')) {
      const updated = deleteUser(userId)
      setUsersList(updated)
    }
  }

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <div>
            <h3 className="admin-modal__title">Gestion des Utilisateurs</h3>
            <p className="admin-modal__sub">Comptes d'administration Mornaco</p>
          </div>
          <button className="admin-modal__close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        {/* User list */}
        <div className="user-list">
          {usersList.map((u) => (
            <div key={u.id} className="user-row">
              <div className="user-row__info">
                <span className="user-row__name">{u.display_name || u.username}</span>
                <span className="user-row__sub">@{u.username}</span>
              </div>
              <div className="user-row__right">
                <span className={`role-pill role-pill--${u.role}`}>
                  {u.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                </span>
                {u.id !== currentUser?.id && u.username !== currentUser?.username ? (
                  <button
                    className="user-del-btn"
                    onClick={() => handleDeleteUser(u.id)}
                    title="Supprimer l'utilisateur"
                  >
                    Retirer
                  </button>
                ) : (
                  <span className="user-self-tag">(Vous)</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add User Form */}
        <div className="add-user-section">
          <h4 className="add-user-title">Ajouter un utilisateur</h4>
          {errorMsg && <div className="admin-err">{errorMsg}</div>}
          <form className="add-user-grid" onSubmit={handleAddUser}>
            <input
              type="text"
              className="admin-input"
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="admin-input"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="admin-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            <button type="submit" className="admin-btn admin-btn--primary">
              Ajouter l'accès
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
