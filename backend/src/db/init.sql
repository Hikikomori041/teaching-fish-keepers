CREATE TABLE IF NOT EXISTS events (
  id               SERIAL PRIMARY KEY,
  title            VARCHAR(255) NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  date             TIMESTAMPTZ NOT NULL,
  end_date         TIMESTAMPTZ,
  location         VARCHAR(255) NOT NULL DEFAULT '',
  image_url        VARCHAR(500),
  max_participants INTEGER,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
