---- Users table ----
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  email VARCHAR(40),
  phone VARCHAR(25),
  verified boolean default false,
  password VARCHAR(25),
  avatar VARCHAR(300),
  bio VARCHAR(400) NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CHECK(COALESCE(email,phone) IS NOT NULL),
  CHECK(COALESCE(email,password) IS NOT NULL AND phone IS NULL)
);

---- Posts table ----
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lat DECIMAL CHECK (lat is null or (
  lat >=-90 AND lat <=90
  )),
  lng DECIMAL CHECK(lng is null or (
  lng >=-180 AND lng <=180
  )),
  caption VARCHAR(240),
  url VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---- Comments table ----
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  
  UNIQUE(user_id,post_id)
);

---- Likes table ---- 
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE ,
  comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  
  -- CONSTRAINT one_like_target CHECK (
  --   (post_id IS NOT NULL AND comment_id IS NULL)
  --   OR (post_id IS NULL AND comment_id IS NOT NULL)
  -- ),
  CHECK (
    (COALESCE((post_id)::BOOLEAN::INTEGER,0)
   + COALESCE((comment_id)::BOOLEAN::INTEGER,0)) = 1
  ) ,
  UNIQUE(user_id,post_id,comment_id)
);

----  Photo tags -- -- 
CREATE TABLE photo_tags (
  id SERIAL PRIMARY KEY,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  UNIQUE(post_id,user_id)
);

----  caption_tags tags -- -- 
-- even though he is mentioned multiple times
-- but this fact is only saved once
CREATE TABLE caption_tags (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  UNIQUE(post_id,user_id)
);
---- hashtags table ---- 
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) UNIQUE NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---- hashtags_posts table ---- 
CREATE TABLE hashtags_posts (
  id SERIAL PRIMARY KEY,
  hashtag_id INTEGER  NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  UNIQUE(post_id,hashtag_id)
);

---- Follwers table ---- 
CREATE TABLE follwers (
  id SERIAL PRIMARY KEY,
  leader_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  follwer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follwer_id,leader_id)
);