import random
import datetime

# Sample data for products
names = ['T-Shirt', 'Jeans', 'Sneakers', 'Jacket', 'Hat', 'Socks', 'Sweater', 'Dress', 'Skirt', 'Blouse']
descriptions = ['Comfortable', 'Stylish', 'Casual', 'Elegant', 'Durable', 'Lightweight', 'Breathable', 'Warm', 'Cool', 'Trendy']
brands = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']
sizes = ['S', 'M', 'L', 'XL']
colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Brown', 'Gray']

# Open a file to write the INSERT statements
with open('insert_products.sql', 'w') as file:
    for i in range(1, 10001):
        # Generate random product data
        name = random.choice(names)
        description = random.choice(descriptions) + ' ' + name.lower()
        brand = random.choice(brands)
        price = round(random.uniform(10.0, 500.0), 2)
        size = random.choice(sizes)
        color = random.choice(colors)
        created_at = datetime.datetime.now() - datetime.timedelta(days=random.randint(0, 365))
        updated_at = created_at + datetime.timedelta(days=random.randint(0, 30))

        # Escape single quotes in strings
        name_escaped = name.replace("'", "''")
        description_escaped = description.replace("'", "''")
        brand_escaped = brand.replace("'", "''")
        size_escaped = size.replace("'", "''")
        color_escaped = color.replace("'", "''")

        # Create the INSERT statement
        insert_statement = f"INSERT INTO Product (name, description, brand, price, size, color, createdAt, updatedAt) VALUES ('{name_escaped}', '{description_escaped}', '{brand_escaped}', {price}, '{size_escaped}', '{color_escaped}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}', '{updated_at.strftime('%Y-%m-%d %H:%M:%S')}');\n"

        # Write the INSERT statement to the file
        file.write(insert_statement)

print("Insert statements have been written to insert_products.sql")