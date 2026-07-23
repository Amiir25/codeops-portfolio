'''
Copy your day05/account.py into day06/, then build on it — don't restart.

A refactored bank.py in which an AccountFactory creates accounts by type, an Observer sends
alerts on transactions, and a BankConfig Singleton holds the shared rates and limits.

Requirements
• Apply SRP: move notification out of Account into a separate observer; keep Account focused on
balance logic.
• Add an AccountFactory.create(kind, owner, number, balance=0) for the savings and current
types.
• Add subscribe() and _notify() to Account, plus an SMSAlert and an AuditLog observer.
• Add a BankConfig Singleton for the interest rate and overdraft limit; read it from your account
classes.
'''

# Bank Config
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            # Define the shared values here
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
    
    @property
    def balance(self):
        return self._balance

    # Observer Methods
    def subscribe(self, observer):
        """Add an observer to this account."""
        self.subscribers.append(observer)

    def _notify(self, message):
        """Tell all subscribers that a transaction happened."""
        for sub in self.subscribers:
            sub.update(self.account_number, message)

    # Transaction Methods
    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive!")
            return False
        
        self._balance += amount
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
        self._notify(f"Withdrew: {amount}. New balance: {self._balance}")
        return True

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Acc.No: {self.account_number}")
        print(f"Balance: {self._balance}")


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
        print("\n[SavingsAccount]")
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
            self._notify(f"Withdrew: {amount} (Overdraft used). New balance: {self._balance}")
            return True
        
        print("Overdraft limit exceeded!")
        return False
    
    def statement(self):
        print("\n[CurrentAccount]")
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



print("*** 1. Creating Accounts using Factory ***")
sav_acc = AccountFactory.create("savings", "Kebede", 10002310, 1250)
cur_acc = AccountFactory.create("current", "Almaz", 10003201, 450)

print("\n*** 2. Setting up Observers ***")
sms = SMSAlert()
audit = AuditLog()

sav_acc.subscribe(sms)
sav_acc.subscribe(audit)

cur_acc.subscribe(audit)

print("\n*** 3. Testing Transactions and Notifications ***")
sav_acc.deposit(250)
sav_acc.add_interest()

cur_acc.withdraw(600)
