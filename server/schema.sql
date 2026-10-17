-- Form submissions from traverseminds.ug. Applied automatically on API start (idempotent).

CREATE TABLE IF NOT EXISTS submissions (
  id          BIGSERIAL PRIMARY KEY,
  form        TEXT        NOT NULL,                 -- contact, pricing-enquiry, careers-application, ...
  email       TEXT,
  name        TEXT,
  data        JSONB       NOT NULL,                 -- full submission (uploaded files recorded by name/size only)
  country     TEXT,                                 -- visitor country as detected by Cloudflare
  status      TEXT        NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'contacted', 'won', 'lost', 'spam')),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submissions_form_created ON submissions (form, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions (lower(email));
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions (status) WHERE status = 'new';

-- ── Admin dashboard ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admin_users (
  id             BIGSERIAL PRIMARY KEY,
  email          TEXT        NOT NULL UNIQUE,
  name           TEXT        NOT NULL,
  password_hash  TEXT        NOT NULL,
  role           TEXT        NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  active         BOOLEAN     NOT NULL DEFAULT true,
  last_login_at  TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only a SHA-256 of the session token is stored, so a database leak does not leak live sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash  TEXT        PRIMARY KEY,
  user_id     BIGINT      NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user ON admin_sessions (user_id);

-- Who did what, for accountability and data-protection requests
CREATE TABLE IF NOT EXISTS audit_log (
  id             BIGSERIAL PRIMARY KEY,
  user_id        BIGINT      REFERENCES admin_users(id) ON DELETE SET NULL,
  action         TEXT        NOT NULL,   -- login, update_submission, delete_submission, export, create_user, ...
  submission_id  BIGINT,
  detail         JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log (created_at DESC);
