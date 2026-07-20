'''
1. Unique cities

Given a list with repeated city names, use a set to print the distinct cities, then
the count.
'''

cities = ["Addis Ababa", "Adama", "Hawasa", "Adama", "Hawasa", "Harar", "Adama", "Addis Ababa"]

print(set(cities))
print(len(set(cities)))


# ====================================================================== #

'''
2. Price report.

Make a dictionary of five grocery items and prices in ETB. Loop with .items() to
print each on its own line.
'''

grocery_items = {
    "banana": 100,
    "apple": 450,
    "orange": 240,
    "mango": 180,
    "avocado": 200,
}

for item, price in grocery_items.items():
    print(f"{item.title()}: {price} ETB")


# ====================================================================== #

'''
3. Tax comprehension.

Given prices = [100, 250, 400, 80], use one comprehension to build
a list with 15% tax added.
'''

prices = [100, 250, 400, 80]

with_tax = [round(price * 1.15, 2) for price in prices]
print(with_tax)


# ====================================================================== #

'''
4. Cheap items.

From the same list, use a comprehension with a condition to keep only prices
under 200.
'''

cheap_items = [round(price * 1.15, 2) for price in prices if price > 200]
print(cheap_items)


# ====================================================================== #

'''
5. Write & read.

Write three customer names to names.txt, then open it and print each name
back, one per line.
'''

with open('names.txt', 'w') as f:
    f.write("Steve Jobs\n")
    f.write("Albert Einstine\n")
    f.write("Elon Musk")

with open("names.txt") as f:
    for line in f:
        print(line.strip())


# ====================================================================== #

'''
6. Safe division.

Ask the user for a number and divide 1000 by it, catching both ValueError and
ZeroDivisionError.
'''

try:
    number = int(input("Enter a number: "))
    result = 1000 / number
except ValueError:
    print("Enter only a number.")
except ZeroDivisionError:
    print("Enter a non-zero integer.")
else:
    print(result)
finally:
    print("Done")