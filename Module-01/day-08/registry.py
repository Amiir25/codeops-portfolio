'''
The project gets searchable today. Your registry holds many accounts; now make them
rankable and searchable. Copy your day07/registry.py into day08/, then add a balance
leaderboard, a binary search by account number, and a recursive transaction total. Push the
result to your day08 folder before Day 9, where you'll model hierarchical and connected data
with trees and graphs.

Three additions to the AccountRegistry: a top_by_balance(n) leaderboard, a
find_by_number(number) that uses binary search over sorted account numbers, and a recursive
total_transactions(number).

Requirements
• Add top_by_balance(n) using sorted(key=lambda a: a.balance, reverse=True); return the top
n.
• Write your own binary_search and use it in find_by_number(number) over the sorted account
numbers.
• Add a recursive total_transactions(number) that sums one account's transaction history.
• Do not us
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
            
            # Match found!
            if current_account.account_number == number:
                return current_account

            # Target is smaller, discard right half
            elif current_account.account_number > number:
                high = mid - 1

            # Target is larger, discard left half
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



print("*** 1. Setting up Registry and Factory ***")
registry = AccountRegistry()

acc_kebede = AccountFactory.create("savings", "Kebede", 10002310, 1250)
acc_almaz = AccountFactory.create("current", "Almaz", 10003201, 450)
acc_abebe = AccountFactory.create("savings", "Abebe", 10001100, 5000) 

registry.add(acc_kebede)
registry.add(acc_almaz)
registry.add(acc_abebe)

print("\n*** 2. Setting up Observers ***")
audit = AuditLog()
acc_kebede.subscribe(audit)
acc_almaz.subscribe(audit)
acc_abebe.subscribe(audit)

print("\n*** 3. Generating Transactions to build history ***")
acc_kebede.deposit(250)  
acc_kebede.withdraw(100) 
acc_almaz.withdraw(200)   

print("\n*** 4. Testing Requirement #1: Leaderboard (Top 2) ***")
top_accounts = registry.top_by_balance(2)
for index, acc in enumerate(top_accounts, 1):
    print(f"Rank {index}: {acc.owner} with Balance: {acc.balance}")

print("\n*** 5. Testing Requirement #2: Custom Binary Search ***")

search_target = 10003201
found_acc = registry.find_by_number(search_target)
if found_acc:
    print(f"Binary Search Successful! Found Account Number {search_target} belonging to {found_acc.owner}")
else:
    print("Account not found by binary search.")

print("\n*** 6. Testing Requirement #3: Recursive Transaction Total ***")

kebede_total_tx = registry.total_transactions(10002310)
print(f"Total historical money flow processed for Kebede (Recursively Calculated): {kebede_total_tx}")
