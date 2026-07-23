'''
1. Recursive sum.

Write a recursive total(nums) that sums a list, and a recursive count_down(n)
that prints n down to 1.
'''

# 1. Recursive Sum
def total(nums):
    # Base Case: If the list is empty, the sum is 0
    if not nums:
        return 0
    # Recursive Case: Add the first number to the total of the remaining list
    return nums[0] + total(nums[1:])

# 2. Recursive Count Down
def count_down(n):
    # Base Case: Stop when we go below 1
    if n < 1:
        return
    print(n)
    # Recursive Case: Call itself with a smaller number
    count_down(n - 1)


# Testing Task 1
print("***1. Testing Recursion***")
numbers = [1, 2, 3, 4, 5]
print(f"Total sum of {numbers}: {total(numbers)}")  # Expected: 15

print("Counting down:")
count_down(3)


# ====================================================================== #

'''
2. Binary search.

Implement binary_search(items, target) on a sorted list and return the index,
or -1. Test it on a sorted list of balances.
'''

def binary_search(items, target):
    low = 0
    high = len(items) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        # Match found
        if items[mid] == target:
            return mid
        # Target is smaller, ignore right half
        elif items[mid] > target:
            high = mid - 1
        # Target is larger, ignore left half
        else:
            low = mid + 1
            
    return -1  # Return -1 if the target is not in the list


# Testing Task 2 with a sorted list of account balances
print("\n--- 2. Testing Binary Search ---")
sorted_balances = [450, 1000, 1250, 3000, 5000]
target_balance = 1250

index = binary_search(sorted_balances, target_balance)
print(f"Balances: {sorted_balances}")
print(f"Searching for {target_balance}... Found at index: {index}")


# ====================================================================== #

'''
3. Merge sort.

Implement merge_sort(items) and its merge helper. Confirm it matches sorted()
on random lists.
'''

def merge_sort(items):
    # Base Case: A list of 0 or 1 elements is already sorted
    if len(items) <= 1:
        return items
        
    # Split the list in half
    mid = len(items) // 2
    left_half = merge_sort(items[:mid])
    right_half = merge_sort(items[mid:])
    
    # Merge the sorted halves together
    return merge(left_half, right_half)

def merge(left, right):
    sorted_list = []
    i = 0  # Pointer for left list
    j = 0  # Pointer for right list
    
    # Compare elements from both lists and combine them in order
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            sorted_list.append(left[i])
            i += 1
        else:
            sorted_list.append(right[j])
            j += 1
            
    # Append any remaining items left over
    sorted_list.extend(left[i:])
    sorted_list.extend(right[j:])
    return sorted_list


# Testing Task 3 against Python's built-in sorted()
print("\n--- 3. Testing Merge Sort ---")
random_list = [1250, 450, 5000, 3000, 1000]
custom_sorted = merge_sort(random_list)
builtin_sorted = sorted(random_list)

print(f"Original: {random_list}")
print(f"Our Merge Sort: {custom_sorted}")
print(f"Matches built-in sorted()? {custom_sorted == builtin_sorted}")


# ====================================================================== #

'''
4. Sort with a key.

Given a list of (name, balance) tuples, sort it by balance descending using
sorted(key=...).
'''

# List of (name, balance) tuples
accounts = [
    ("Kebede", 1250),
    ("Almaz", 450),
    ("Abebe", 5000),
    ("Chaltu", 3000)
]

# Sort by balance descending (highest balance first)
# lambda entry: entry[1] tells Python to look at index 1 (the balance) of each tuple
sorted_accounts = sorted(accounts, key=lambda entry: entry[1], reverse=True)


# Testing Task 4
print("\n--- 4. Testing Sort with a Key ---")
print("Accounts ranked by highest balance:")
for name, balance in sorted_accounts:
    print(f"- {name}: {balance} ETB")


# ====================================================================== #

'''
5. Two pointers. Write has_pair(nums, target) for a sorted list, returning whether two values
sum to the target.
'''

def has_pair(nums, target):
    # Initialize pointers at both ends of the sorted list
    left = 0
    right = len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        # Found the target sum
        if current_sum == target:
            return True
        # Sum is too small, move left pointer forward to pick a larger number
        elif current_sum < target:
            left += 1
        # Sum is too large, move right pointer backward to pick a smaller number
        else:
            right -= 1
            
    return False


# Testing Task 5
print("\n--- 5. Testing Two Pointers ---")
sorted_nums = [10, 20, 35, 50, 75]
target_sum = 70

found = has_pair(sorted_nums, target_sum)
print(f"List: {sorted_nums} | Target Sum: {target_sum}")
print(f"Does a matching pair exist? {found}") # True (20 + 50 = 70)
