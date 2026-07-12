'''

A program customer_report.py that takes a list of customers (name and TeleBirr balance in ETB),
assigns each a tier, and prints a tidy report — plus a summary count of how many customers fall in
each tier.

Requirements
• Store at least five customers as a list of (name, balance) pairs.
• Write a function tier(balance) that returns "Premium" (≥ 1000), "Standard" (≥ 500), or "Basic"
(below 500).
• Loop over the customers and print one line each: name, tier, and balance in ETB.
• After the loop, print how many customers are in each tier.

'''

customers = [
    ("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
    ("Hanna", 1200), ("Samuel", 450),
]

def tier(balance):
    if balance > 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"

for name, balance in customers:
    print(f"{name}: {tier(balance)} {balance} ETB")