'''
A program inventory.py for a small Addis Ababa pharmacy that loads stock from a file into a
dictionary, lets you update quantities, reports low-stock items, and saves the updated stock back to
the file.

Requirements
• Read stock.txt (one item,quantity per line) into a dictionary, inside a try / except for a
missing file.
• Add a function that increases or decreases an item's quantity by a given amount.
• Use a comprehension or loop to print every item where the quantity is below 10 (low stock).
• Write the updated dictionary back to stock.txt so the changes persist.
'''

stock = {}

# Read the file
try:
    with open('stock.txt') as f:
        for line in f:
            item, qty = line.strip().split(':')
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file found.")

# Quantity inc/dec function
def update_qty(item, amount, update = "add"):
    if update == "add":
        stock[item] += amount
    else:
        stock[item] -= amount

# Function call for updates
update_qty("Amoxicillin 250mg", 40, "sub")
update_qty("Albuterol HFA Inhaler", 8, "sub")
update_qty("Lipitor 20mg", 80)

# Low stock items list
low_stock = {item: qty for item, qty in stock.items() if stock[item] < 10}
for i in low_stock:
    print(i)

# Write updates to the file
for low_item, qty in low_stock.items():
    stock[low_item] = qty

with open('stock.txt', 'w') as f:
    for item, qty in stock.items():
        f.write(f"{item}:{qty}\n")