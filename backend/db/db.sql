
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