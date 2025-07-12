-- Get all posts of users in the table
-- SELECT * from posts where posts.user_id in (SELECT id from users where bio is not null and avatar is not null limit 5 OFFSET 10)

-- SELECT * from posts
-- JOIN (
--  SELECT *
--     FROM users
--     WHERE bio IS NOT NULL AND avatar IS NOT NULL
--     LIMIT 5 OFFSET 10
-- ) u on u.id = posts.user_id

 -- SELECT *
 --    FROM users where users.id=200

-- SELECT * from posts JOIN
-- (
-- SELECT * from users where users.id=200 
-- ) as u on u.id=user_id

-- select user_id,count(*) from likes group by user_id
SELECT *  likes_count from likes  
-- SELECT *,(
-- SELECT count(*) as likes_count from likes where l.post_id = posts.id 
-- ) as l from posts
