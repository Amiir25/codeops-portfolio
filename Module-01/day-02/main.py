'''
A small python program that splits a restaurant bill, with a tip, across friends
'''

def split_bill(total, people, tip_rate = 0.10):
    total = total + (total * tip_rate)
    amount = total / len(people)

    for person in people:
        print(f"{person}: {amount}")

total = 540
people = ["Alex", "John", "Lisa"]

split_bill(total, people)