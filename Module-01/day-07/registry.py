'''
Copy your day06/account.py into day07/, then build on it — don't restart.

An AccountRegistry that stores accounts in a dict keyed by account number for instant lookup,
lists them in order, and tracks each account's transactions on a stack so the latest can be undone.

Requirements
• Store accounts in a dict keyed by account number; add(acc) and find(number) must be O(1).
• Add list_all() that returns accounts in insertion order (use a list alongside the dict).
• Give each account a history stack; push a record on every deposit and withdrawal.
• Add undo_last() that pops the most recent transaction and reverses its effect.
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


# Account Registery
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


print("*** 1. Setting up Registry and Factory ***")
registry = AccountRegistry()

sav_acc = AccountFactory.create("savings", "Kebede", 10002310, 1250)
cur_acc = AccountFactory.create("current", "Almaz", 10003201, 450)

registry.add(sav_acc)
registry.add(cur_acc)

print("\n*** 2. Setting up Observers ***")
sms = SMSAlert()
audit = AuditLog()

sav_acc.subscribe(sms)
sav_acc.subscribe(audit)
cur_acc.subscribe(audit)

print("\n*** 3. Instant Lookups O(1) & Insertion Order Listing ***")
found = registry.find(10002310)
if found:
    print(f"Found Account! Owner is: {found.owner}")

print("\nListing all registry entries in order:")
for account in registry.list_all():
    account.statement()

print("\n*** 4. Testing Transactions and History Stack Undo ***")
sav_acc.deposit(250)
sav_acc.withdraw(100)

print("\n--- Triggering Undo Action on Savings Account ---")
sav_acc.undo_last()

print("\n--- Triggering Another Undo Action on Savings Account ---")
sav_acc.undo_last()
