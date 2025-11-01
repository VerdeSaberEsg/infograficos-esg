import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', label: 'Consulta' },
  { to: '/alerts', label: 'Alertas' },
  { to: '/dados', label: 'Todos os dados' }
];

const AppShell = () => {
  const location = useLocation();
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <header
        style={{
          padding: 'var(--spacing-xl) var(--spacing-xxl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-display)',
              fontSize: '2rem',
              letterSpacing: '-0.02em'
            }}
          >
            Painel ESG Oficial
          </h1>
          <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-text-secondary)' }}>
            Dados exclusivamente oficiais, consolidados com transparência.
          </p>
        </div>
        <nav aria-label="Seções principais">
          <ul
            style={{
              display: 'flex',
              gap: 'var(--spacing-lg)',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    fontWeight: 600,
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    position: 'relative'
                  })}
                >
                  {({ isActive }) => (
                    <span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          style={{
                            position: 'absolute',
                            left: 0,
                            bottom: -8,
                            width: '100%',
                            height: 2,
                            background: 'var(--color-primary)',
                            borderRadius: 999
                          }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main
        style={{
          flex: 1,
          padding: '0 var(--spacing-xxl) var(--spacing-xxl)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', maxWidth: 1200 }}>
          <Outlet key={location.pathname} />
        </div>
      </main>
    </div>
  );
};

export default AppShell;
