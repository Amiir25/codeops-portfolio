'''
1. Build a BST.
Write a Node class and an insert(root, value) function. Insert several balances,
then print them with an in-order traversal — they should come out sorted.

2. Tree depth.
Write a recursive height(node) that returns the depth of a binary tree.
'''

# Node class for a Binary Search Tree
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None   # Points to smaller values
        self.right = None  # Points to larger values

# 1. Insert function for BST
def insert(root, value):
    # If the tree/sub-tree is empty, create and return the node
    if root is None:
        return TreeNode(value)
    
    # Otherwise, recur down the tree
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

# 1. In-Order Traversal (Left -> Root -> Right)
def in_order(root):
    if root is not None:
        in_order(root.left)
        print(root.value, end=" ")
        in_order(root.right)

# 2. Recursive Tree Height (Depth)
def height(node):
    # Base Case: An empty tree has a height of 0
    if node is None:
        return 0
    
    # Find the height of each sub-tree recursively
    left_height = height(node.left)
    right_height = height(node.right)
    
    # Take the larger height and add 1 for the current node layer
    return max(left_height, right_height) + 1


# --- Testing Tree Tasks ---
print("--- 1 & 2. Testing BST and Tree Depth ---")
balances = [1250, 450, 5000, 3000, 1500]

# Build the tree using the first balance as the root node
root_node = None
for bal in balances:
    root_node = insert(root_node, bal)

print("In-Order Traversal (Should be sorted automatically):")
in_order(root_node)
print() # New line

print(f"Total Height (Max Depth) of the Tree: {height(root_node)}")


# ====================================================================== #

'''
3. Graph BFS.
Given an adjacency-list graph, implement bfs(graph, start) and return the set of
reachable vertices.

4. Graph DFS.
Implement dfs(graph, start) recursively, and compare the visit order with your BFS.
'''

# 3. Graph Breadth-First Search (Layer by layer)
def bfs(graph, start):
    queue = [start]
    visited = [] # Keeps track of execution visit order
    
    while queue:
        current = queue.pop(0) # Pop from front (FIFO)
        if current not in visited:
            visited.append(current)
            # Add all unvisited neighbor nodes to the back of the line
            for neighbor in graph[current]:
                if neighbor not in visited:
                    queue.append(neighbor)
    return visited

# 4. Graph Depth-First Search (Explores as deep as possible down paths)
def dfs(graph, start, visited=None):
    if visited is None:
        visited = [] # Keeps track of execution visit order
        
    visited.append(start)
    
    # Recursively drop into neighbors immediately
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
            
    return visited


# --- Testing Graph Tasks ---
print("\n--- 3 & 4. Testing Graph Traversals ---")
# Adjacency-list modeling standard account transfers relationships
# Branch network map: 10001 paid 10002 and 10003. 10002 paid 10004.
bank_graph = {
    10001:[],
    10002:[],
    10003:[],
    10004: []
}

start_account = 10001
bfs_order = bfs(bank_graph, start_account)
dfs_order = dfs(bank_graph, start_account)

print(f"BFS Visit Order (Broad approach): {bfs_order}")
print(f"DFS Visit Order (Deep path approach): {dfs_order}")
print(f"Are all elements reachable? Set of vertices: {set(bfs_order)}")


# ====================================================================== #

'''
5. Priority queue.

Use heapq to push five (priority, task) tuples in mixed order, then pop them all
— they should come out by priority.
'''

import heapq

# --- Testing Priority Queue Tasks ---
print("\n--- 5. Testing Priority Queue with Heapq ---")

# Create an empty list array to serve as our base heap
task_heap = []

# Push tuples: (Priority Number, Task Name)
# Note: Lower priority numbers come out first in Python's heapq (Min-Heap)
heapq.heappush(task_heap, (3, "Review Day 07 and Day 08 code profiles"))
heapq.heappush(task_heap, (1, "Fix critical bank ledger database connection bug"))
heapq.heappush(task_heap, (5, "Clean up comments inside practice scripts"))
heapq.heappush(task_heap, (2, "Prepare presentation for Module 1 assessment"))
heapq.heappush(task_heap, (4, "Refactor class layouts for OCP requirements"))

print("Popping tasks out by strict numerical priority level processing:")
while task_heap:
    priority, task_name = heapq.heappop(task_heap)
    print(f"-> [Priority {priority}] Processing Task: {task_name}")
