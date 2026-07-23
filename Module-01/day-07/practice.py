'''
1. Name the Big-O.

For five short snippets (a list index, a single loop, a nested loop, a dict
lookup, a binary search), write the Big-O of each as a comment and explain why.
'''

names_list = ["Abebe", "Kebede", "Almaz", "Chaltu", "Dawit"]

# --- 1. List index ---
# Big-O: O(1) - Constant Time
# Why: Python arrays sit sequentially in memory. Finding an item by its index 
# requires a simple math calculation to jump directly to that exact spot.
name = names_list[0]

# --- 2. A single loop ---
# Big-O: O(n) - Linear Time
# Why: The runtime grows matching the list size. If the list has 'n' items, 
# the loop must step forward exactly 'n' times.
for name in names_list:
    print(name)

# --- 3. A nested loop ---
# Big-O: O(n²) - Quadratic Time
# Why: For every single step in the outer loop, the inner loop runs completely.
# If 'n' is 10, the code executes 10 * 10 = 100 times.
for i in names_list:
    for j in names_list:
        print(i, j)

# --- 4. A dict lookup ---
# Big-O: O(1) - Constant Time
# Why: Dictionaries use a hashing function to turn your lookup key into an instant 
# index address, finding the item immediately without any searching loops.
account = accounts_dict[10001]

# --- 5. A binary search ---
# Big-O: O(log n) - Logarithmic Time
# Why: Each decision step cuts the search space exactly in half. Even if your collection 
# doubles in size, it only takes one extra check to narrow down the target.


# ====================================================================== #

'''
2. List vs. dict lookup.

Build a list and a dict of 100,000 fake account numbers. Time how long it
takes to find one near the end in each.
'''

import time

# Create 100,000 sequential fake account numbers
total_accounts = 100000
target_account = 99999

# Build the data structures
accounts_list = list(range(total_accounts))
accounts_dict = {num: f"User_{num}" for num in range(total_accounts)}

# Time the List Lookup
start_time = time.perf_counter()
is_found_in_list = target_account in accounts_list
list_duration = time.perf_counter() - start_time

# Time the Dict Lookup
start_time = time.perf_counter()
# Dict jumps instantly to the memory bucket address using a hash key (O(1))
is_found_in_dict = target_account in accounts_dict
dict_duration = time.perf_counter() - start_time

print(f"List Lookup Time: {list_duration:.6f} seconds")
print(f"Dict Lookup Time: {dict_duration:.6f} seconds")


# ====================================================================== #

'''
3. Build a stack.
Write a Stack class with push, pop, and peek, and use it to reverse a list of names.
'''

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        """Add an item to the top of the stack."""
        self.items.append(item)

    def pop(self):
        """Remove and return the top item."""
        if len(self.items) == 0:
            return None
        return self.items.pop()

    def peek(self):
        """Look at the top item without removing it."""
        if len(self.items) == 0:
            return None
        return self.items[-1]


# Using the stack to reverse a list of names
original_names = ["Abebe", "Kebede", "Almaz"]
name_stack = Stack()

# 1. Push everyone onto the stack
for name in original_names:
    name_stack.push(name)

# 2. Pop them back off to reverse the sequence order
reversed_names = []
while name_stack.peek() is not None:
    reversed_names.append(name_stack.pop())

print("Original list:", original_names)
print("Reversed list:", reversed_names)


# ====================================================================== #

'''
4. Build a queue.

Use collections.deque to model a bank service line: enqueue five customers,
then serve them in order.
'''

from collections import deque

# We use deque because popping from the front is lightning fast O(1)
bank_line = deque()

print("--- Customers Arriving (Enqueue) ---")
bank_line.append("Abebe")
bank_line.append("Kebede")
bank_line.append("Almaz")
bank_line.append("Chaltu")
bank_line.append("Dawit")
print(f"Current line: {list(bank_line)}")

print("\n--- Serving Customers in Order (Dequeue) ---")
while len(bank_line) > 0:
    # popleft() removes from index 0 (the front of the line)
    served_customer = bank_line.popleft()
    print(f"Now serving: {served_customer} | Remaining in line: {len(bank_line)}")


# ====================================================================== #

'''
5. Singly linked list. Implement a Node and a LinkedList with push_front and a print_all() that
walks the chain.
'''

class Node:
    def __init__(self, data):
        self.data = data      # Holds the actual value
        self.next = None      # Points forward to the next Node object


class LinkedList:
    def __init__(self):
        self.head = None      # Points to the first element in the chain

    def push_front(self, data):
        """Inserts a new value right at the beginning of the chain."""
        new_node = Node(data)
        # Link the new node to point to the old start node
        new_node.next = self.head
        # Move our head pointer to target our brand new node entry
        self.head = new_node

    def print_all(self):
        """Walks step-by-step through the linked chain and prints everything."""
        current = self.head
        while current is not None:
            print(f"[{current.data}] -> ", end="")
            current = current.next
        print("None")


# Testing the chain link implementation
my_list = LinkedList()
my_list.push_front("Almaz")
my_list.push_front("Kebede")
my_list.push_front("Abebe")

# Because we push to the front, the last one added will print first!
my_list.print_all()  # Output: [Abebe] -> [Kebede] -> [Almaz] -> None
