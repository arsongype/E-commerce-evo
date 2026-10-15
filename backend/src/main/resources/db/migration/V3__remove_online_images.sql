UPDATE products SET image_url = '' WHERE image_url LIKE 'https://images.unsplash.com%';
UPDATE product_images SET image_url = '' WHERE image_url LIKE 'https://images.unsplash.com%';
