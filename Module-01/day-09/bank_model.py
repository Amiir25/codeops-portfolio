'''
The final structures, today. Your registry stores accounts; now model the relationships
between them. Copy your day08/registry.py into day09/, then add a Branch tree with a recursive
balance total and a transfers graph you can traverse with BFS. Push the result to your day09
folder before Day 10, the Module 1 review and assessment.

What you will build
A Branch tree (head office → regions → branches, each holding accounts) with a recursive
total_balance(), and a transfers graph (account → accounts it has paid) with a bfs() that finds
who is reachable.

Requirements
• Build a Branch class with children and accounts; nest at least three levels deep.
• Write a recursive total_balance() that sums a branch and all its sub-branches.
• Build a transfers graph as a dict of account number → list of recipients.
• Write bfs(transfers, start) returning every account reachable from a given one.
'''

# Bank Config
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.15
            cls._instance.overdraft_limit = 500
        return cls._instance


# 2. Observers
class SMSAlert:
    def update(self, account_number, message):
        print(f"[SMS Alert to Acc {account_number}]: {message}")

class AuditLog:
    def update(self, account_number, message):
        print(f"[Audit Log System]: Acc {account_number} performed action -> {message}")


# Account Classes
class Account:
    """A class to model account for account management system"""

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self.subscribers = []        
        self.history_stack = []
    
    @property
    def balance(self):
        return self._balance

    # Observer Methods
    def subscribe(self, observer):
        self.subscribers.append(observer)

    def _notify(self, message):
        for sub in self.subscribers:
            sub.update(self.account_number, message)

    # Transaction Methods
    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive!")
            return False
        
        self._balance += amount
        self.history_stack.append({"type": "deposit", "amount": amount})
        self._notify(f"Deposited: {amount}. New balance: {self._balance}")
        return True
    
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive!")
            return False
        
        if amount > self._balance:
            print("Insufficient balance!")
            return False
        
        self._balance -= amount
        self.history_stack.append({"type": "withdrawal", "amount": amount})
        self._notify(f"Withdrew: {amount}. New balance: {self._balance}")
        return True

    def undo_last(self):
        """Pops the most recent transaction and reverses its effect."""
        if not self.history_stack:
            print("No transactions to undo!")
            return False
            
        last_transaction = self.history_stack.pop()
        tx_type = last_transaction["type"]
        tx_amount = last_transaction["amount"]
        
        if tx_type == "deposit":
            self._balance -= tx_amount
            self._notify(f"UNDO: Cancelled deposit of {tx_amount}. New balance: {self._balance}")
        elif tx_type == "withdrawal":
            self._balance += tx_amount
            self._notify(f"UNDO: Cancelled withdrawal of {tx_amount}. New balance: {self._balance}")
            
        return True

    def statement(self):
        print(f"Owner: {self.owner} | Acc.No: {self.account_number} | Balance: {self._balance}")


class SavingsAccount(Account):
    """A sub class of Account to calculate interest over time"""

    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.rate = config.interest_rate
    
    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
    
    def statement(self):
        print("[SavingsAccount]", end=" ")
        super().statement()


class CurrentAccount(Account):
    """A sub class of Account class specifies the overdraft_limit"""

    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.overdraft_limit = config.overdraft_limit
    
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive!")
            return False

        if self._balance - amount >= -self.overdraft_limit:
            self._balance -= amount
            
            self.history_stack.append({"type": "withdrawal", "amount": amount})
            self._notify(f"Withdrew: {amount} (Overdraft used). New balance: {self._balance}")
            return True
        
        print("Overdraft limit exceeded!")
        return False
    
    def statement(self):
        print("[CurrentAccount]", end=" ")
        super().statement()


# Account Factory
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            print(f"Warning: Unknown account type '{kind}'")
            return None


# Account Registry
class AccountRegistry:
    def __init__(self):
        self.accounts_dict = {}
        self.insertion_order_list = []

    def add(self, acc):
        """Adds an account to our lookup tools."""
        self.accounts_dict[acc.account_number] = acc
        self.insertion_order_list.append(acc)

    def find(self, number):
        """Finds an account instantly via its key."""
        return self.accounts_dict.get(number)

    def list_all(self):
        """Returns the accounts list in the order they were added."""
        return self.insertion_order_list

    def top_by_balance(self, n):
        """Returns the top n accounts sorted by highest balance."""
        sorted_leaderboard = sorted(self.insertion_order_list, key=lambda a: a.balance, reverse=True)
        return sorted_leaderboard[:n]

    def find_by_number(self, number):
        """Finds an account using a manual Binary Search loop."""
        sorted_accounts = sorted(self.insertion_order_list, key=lambda a: a.account_number)
        
        low = 0
        high = len(sorted_accounts) - 1
        
        while low <= high:
            mid = (low + high) // 2
            current_account = sorted_accounts[mid]
            
            if current_account.account_number == number:
                return current_account
            elif current_account.account_number > number:
                high = mid - 1
            else:
                low = mid + 1
                
        return None

    def total_transactions(self, number):
        """Finds an account and sums its transaction history values recursively."""
        account = self.find(number)
        if not account:
            return 0
            
        def recursive_sum(history_list):
            if not history_list:
                return 0
            first_transaction = history_list[0]
            remaining_transactions = history_list[1:]
            
            return first_transaction["amount"] + recursive_sum(remaining_transactions)
            
        return recursive_sum(account.history_stack)


# Branch Tree
class Branch:
    def __init__(self, name):
        self.name = name
        self.accounts = []
        self.children = []

    def add_child(self, child_branch):
        """Connects a sub-branch beneath this one."""
        self.children.append(child_branch)

    def add_account(self, account):
        """Registers a localized account to this node."""
        self.accounts.append(account)

    def total_balance(self):
        """Recursively sums the balance of this branch and all lower children nodes."""
        total = 0
        for acc in self.accounts:
            total += acc.balance
            
        for child in self.children:
            total += child.total_balance()
            
        return total


# Graphs & BFS
def bfs(transfers_graph, start_account):
    """Traverses a cash transfer network row-by-row using Breadth-First Search."""
    queue = [start_account]
    visited = [start_account]
    
    while queue:
        current = queue.pop(0)
        recipients = transfers_graph.get(current, [])
        
        for neighbor in recipients:
            if neighbor not in visited:
                visited.append(neighbor)
                queue.append(neighbor)
                
    return visited


print("*** 1. Setting up Registry, Factory, and Base Accounts ***")
registry = AccountRegistry()

acc1 = AccountFactory.create("savings", "Kebede", 10001, 1000)
acc2 = AccountFactory.create("current", "Almaz", 10002, 2000)
acc3 = AccountFactory.create("savings", "Abebe", 10003, 3000)
acc4 = AccountFactory.create("current", "Chaltu", 10004, 4000)

registry.add(acc1)
registry.add(acc2)
registry.add(acc3)
registry.add(acc4)

print("\n*** 2. Constructing the Branch Tree (3 Nesting Levels Deep) ***")
head_office = Branch("Addis Ababa Head Office")

region_north = Branch("North Region Hub")
region_south = Branch("South Region Hub")
head_office.add_child(region_north)
head_office.add_child(region_south)