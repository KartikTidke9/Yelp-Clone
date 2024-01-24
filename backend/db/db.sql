CREATE DATABASE yelp
-- restaurants TABLE
CREATE TABLE
    restaurants (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        price_range INT NOT NULL CHECK (
            price_range > 0
            AND price_range <= 5
        )
    )
    -- reviews TABLE
CREATE TABLE
    reviews (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        review TEXT NOT NULL,
        rating DECIMAL NOT NULL CHECK (
            rating >= 1
            AND rating <= 5
        ), 
        restaurant_id BIGINT NOT NULL REFERENCES restaurants (id)
    );